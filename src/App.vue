<template>
	<div id="app" :class="[{'hide-menu': !isMenuVisible || !user}, loginPage ? 'login-page' : 'application']">
		<Header :showHeader="showHeader" />
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Chat v-if="!loginPage"/>
		<Footer />		
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { USER_KEY } from '@/config/environment.js'
import AuthController from '@/api/AuthController.js'
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Chat from "@/components/chat/Chat"
import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading, Chat },
	computed: mapState(['isMenuVisible', 'showHeader', 'loginPage', 'user']),
	data() {
		return {
			validatingToken: true,
			isMobile: false
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(USER_KEY)
			const userData = JSON.parse(json)
			this.$store.commit('setThemeDefault')
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				return this.$router.push({ name: 'auth' })
			}

			const response = await AuthController.ValidateToken(userData)			

			if(response) {
				this.$store.commit('setUser', userData)

				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(USER_KEY)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		},
		checkScreenWidth() {

			this.isMobile = window.innerWidth < 1200;
			this.$store.commit('setMobile', this.isMobile)
			
			if (this.isMobile) {
				document.documentElement.classList.add('layout-navbar-fixed', 'layout-compact', 'dark-style', 'layout-menu-fixed');
			} else {
				document.documentElement.classList.remove('layout-navbar-fixed', 'layout-compact', 'dark-style', 'layout-menu-fixed');
			}
		},
	},
	async mounted() {		
		await this.validateToken()
		this.checkScreenWidth();
		window.addEventListener('resize', this.checkScreenWidth);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkScreenWidth);
	},
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		--webkit-font-smoothing: antialiased;
		--moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: var(--bs-width-menu-vertical) 1fr;
	}

	#app.application {
		grid-template-areas: 
			"menu header"
			"menu content"
			"menu footer";
	}

	#app.login-page {
		grid-template-areas: 
			"content content"
			"content content"
			"footer footer";
	}

	#app.hide-menu {
		grid-template-columns: 100px 1fr;
	}
</style>