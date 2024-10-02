<template>
  <aside
    id="layout-menu"
    :class="[
      'layout-menu',
      'menu-vertical',
      'menu',
      'bg-menu-theme',
      { 'close': close}
    ]" 
    :style="{ 'pointer-events': disableHover ? 'none' : 'auto' }"
  >
    <div class="app-brand demo">
        <router-link to="/" class="app-brand-link" style="cursor: pointer;">
          <span class="app-brand-logo demo">
            <img 
              :src="getLogo" 
              :style="logoStyle" alt="logo da aiko">
          </span>
        </router-link>

        <a id="btn-arrow" 
           :class="['layout-menu-toggle', 'menu-link', 'text-large', { 'arrow': close }]"
           @click="toggleMenu"
        >
          <i :class="['bx', 'bxs-chevron-right', 'toggle-menu', { 'rotate': toggle }]"></i>
        </a>
      </div>          
  </aside>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'Menu',
  data() {
    return {
      close: false,
      toggle: true,
      disableHover: false,
    }
  },
  computed: {
    ...mapState(['currentTheme']),
    logoStyle() {
      return this.close
        ? {
            width: '50px',
            height: '25px',
            transition: 'all 0.3s ease',
          }
        : {
            width: '80px',
            height: '40px',
            transition: 'all 0.3s ease',
          };
    },
    getLogo() {
      return this.currentTheme == 'light' 
        ? require('@/assets/images/logo.png') 
        : require('@/assets/images/logo-white.png')
    }
  },
  methods: {
    toggleMenu() {
      this.toggle = !this.toggle
      this.close = !this.close
      this.disableHover = true
      this.$store.commit('toggleMenu')

      setTimeout(() => {
        this.disableHover = false;
      }, 100); 
    }
  }
}
</script>

<style>
    .menu {
      grid-area: menu;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }

    .toggle-menu {
      display: flex !important;
      font-size: 16px !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.3s ease;
    }

    #btn-arrow {
      cursor: pointer;
    }

    .rotate {
      transform: rotate(180deg);
    }

    .close {
      width: 100px ! important;
    }

    .arrow {
      inset-inline-start: 5.2rem !important;
    }

    .layout-menu.menu-vertical.menu.bg-menu-theme.close:hover {
      width: 300px !important;
      z-index: 100;
    }

    .layout-menu.menu-vertical.menu.bg-menu-theme.close:hover .arrow{
      inset-inline-start: 17.2rem !important;
    }

    .layout-menu.menu-vertical.menu.bg-menu-theme.close:hover .app-brand .demo img{
      width: 80px !important;
      height: 40px !important;
    }
</style>