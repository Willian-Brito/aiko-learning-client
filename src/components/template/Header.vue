<template>
    <header v-if="showHeader">
        <nav 
            class="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div 
                class="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none" 
                @click="showMenu"
                style="cursor: pointer;"
            >
                <i class="bx bx-menu bx-md"></i>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <!-- Search -->
              <Search />
              <!-- /Search -->

              <!-- Botões -->
              <ul class="navbar-nav flex-row align-items-center ms-auto">

                <div class="d-flex">
                    <div class="btn-menu" @click="openLink('https://github.com/Willian-Brito/aiko-learning-client')">
                        <i class='bx bxl-github'></i>                        
                    </div>                    
                    <div class="btn-menu">
                        <i class='bx bx-bell'></i>
                    </div>
                    <div class="btn-menu" @click="toggleTheme">
                        <i :class="currentTheme == 'light-theme' ? 'bx bx-sun' : 'bx bx-moon'"></i>
                    </div>
                </div>    
                <!--/ Botões --> 

                <!-- User -->
                <UserDropdown />
                <!--/ User -->
              </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue';
import Search from './Search.vue';
// import Theme from './Theme.vue';
import { THEME_KEY } from '@/config/environment.js'
import { mapState } from 'vuex'

export default {
    name: 'Header',
    components: { UserDropdown, Search },
    props: {
      showHeader: Boolean
    },
    data() {
        return {
            openMenu: false
        }
    },
    computed: mapState(['currentTheme']),
    methods: {
        openLink(link) {
            window.open(link, '_blank');
        },
        toggleTheme() {
            let body = document.body
            // body.classList.toggle('dark-theme');
            
            if(body.classList.contains('light-theme')) {   

                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem(THEME_KEY, 'dark-theme');
            } else {

                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem(THEME_KEY, 'light-theme');                
            }

            this.$store.commit('toggleTheme')
        },
        showMenu() {
            document.documentElement.classList.toggle('layout-menu-expanded');
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 38px; 
        width: 38px;
        margin-right: 10px;
        cursor: pointer;
        color: var(--bs-color-icon);
    }

    .btn-menu:hover {
        border-radius: 50%;
        background-color: var(--bs-btn-hover);
    }
</style>