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

    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/>
    
    <!-- <ul class="menu-inner py-1 ps ps--active-y">
      <Tree :data="treeData" :options="treeOptions" ref="tree"/>
    </ul> -->

  </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import CategoryController from '@/api/CategoryController'

export default {
  name: 'Menu',
  components: { Tree },
  data() {
    return {
      close: false,
      toggle: true,
      disableHover: false,
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { 'text': 'name' },
        filter: { emptyText: 'Categoria não encontrada' }
      }
    }
  },
  computed: {
    ...mapState(['currentTheme', 'treeFilter']),
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
    async getTreeData() {
      return await CategoryController.GetCategoriesWithTree()
    },
    toggleMenu() {
      this.toggle = !this.toggle
      this.close = !this.close
      this.disableHover = true
      this.$store.commit('toggleMenu')

      setTimeout(() => {
        this.disableHover = false;
      }, 100); 
    },
    onNodeSelect(node) {      
      this.$router.push({
        name: 'articlesByCategory',
        params: { id: node.id }
      })
    }
  },
  mounted() {
      this.$refs.tree.$on('node:selected', this.onNodeSelect)
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

    .menu a,
    .menu a:hover {
      color: var(--bs-text);
      text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{      
      background-color: var(--bs-menu-tree-hover);
    }

    i.tree-arrow.has-child:after {
      border: 1.5px solid var(--bs-text);
      border-left: 0;
      border-top: 0;
    } 

    .tree-filter-empty {
      margin-left: 20px;
    }

  /* .tree-root {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    height: 100%;

    position: relative;
    overflow: hidden !important;
    overflow-anchor: none;    
    touch-action: auto;

    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  } */
</style>