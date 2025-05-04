<template>
  <aside
    id="layout-menu"
    :class="[
      'layout-menu',
      'menu-vertical',
      'menu',
      'bg-menu-theme',
      { 'close collapsed': close}
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

    <div class="menu-inner-shadow" style="display: block;"></div>

    <div role="tree" class="tree">
      <ul class="menu-inner py-1 ps ps--active-y">
        <li :class="['menu-item', 'active', {'open': toggleArrow }]">
          <a class="menu-link menu-toggle" @click="open">
            <i class="menu-icon tf-icons bx bx-collection" style="margin-left: 5px;"></i>
            <div class="text-truncate">Categorias</div>
            <span class="badge rounded-pill bg-danger ms-auto">{{ totalNodes }}</span>
          </a>
            
          <ul class="menu-sub">              
            <Tree :nodes="treeData" :filter="treeFilter" ref="tree" @node-selected="onNodeSelect" />      
            <!-- <Tree :data="treeData2" :options="treeOptions" :filter="treeFilter" ref="tree"/> -->
          </ul>
        </li>
       </ul>
    </div>

  </aside>
</template>

<script>
import { mapState } from 'vuex'
// import Tree from 'liquor-tree'
import Tree from '@/components/tree/Tree.vue'
import CategoryController from '@/api/CategoryController'

export default {
  name: 'Menu',
  components: { Tree },
  data() {
    return {
      close: false,
      toggle: true,
      disableHover: false,
      toggleArrow: true,
      totalNodes: 0,
      treeData: [],
      treeOptions: {
        propertyNames: { 'text': 'name' },
        filter: { emptyText: 'Categoria não encontrada' }
      }
    }
  },
  computed: {
    ...mapState(['currentTheme', 'treeFilter', 'isMobile']),
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
      return this.currentTheme == 'light-theme' 
        ? require('@/assets/images/logo.png') 
        : require('@/assets/images/logo-white.png')
    }
  },
  methods: {
    async getTreeData() {
      const tree = await CategoryController.GetCategoriesWithTree()
      this.addExpandedAttribute(tree)   
      this.totalNodes =  this.countNodes(tree) 
      return tree      
    },
    open() {      
      this.toggleArrow = !this.toggleArrow      
    },
    countNodes(nodes) {      
      if (!nodes || nodes.length === 0) return 0;      
      let count = nodes.length;
      
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          count += this.countNodes(node.children);
        }
      });

      return count;
    },
    toggleMenu() {

      if(this.isMobile)
      {
        document.documentElement.classList.toggle('layout-menu-expanded');
        return
      }

      document.documentElement.classList.remove('layout-menu-expanded');

      this.toggle = !this.toggle
      this.close = !this.close
      this.disableHover = true
      this.$store.commit('toggleMenu')      

      const subMenu = document.getElementsByClassName('menu-sub')
      const arrow = document.querySelector(".menu-vertical .menu-item.active:not(.menu-item-closing) > .menu-link")
      
      if(this.close) {
        subMenu[0].classList.add("none");
        arrow.classList.add("hide-after");        
      } else {
        subMenu[0].classList.remove("none");
        arrow.classList.remove("hide-after");        
      }

      setTimeout(() => {
        this.disableHover = false;
      }, 100); 
    },
    onNodeSelect(node) {

      this.$router.push({
        name: 'articlesByCategory',
        params: { id: node.id }
      })

      if(this.$mq === 'xs' || this.$mq === 'sm') {
        this.$store.commit('toggleMenu', false)
      }
    },
    addExpandedAttribute(nodes) {

      if (!Array.isArray(nodes)) return;

      nodes.forEach(node => {                
        node.expanded = false;
        
        if (node.children && Array.isArray(node.children) && node.children.length > 0) {
          this.addExpandedAttribute(node.children);
        }
      });
    }
  },
  async mounted() {    
      this.treeData = await this.getTreeData()
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
      width: 95px ! important;
    }

    .arrow {
      inset-inline-start: 5.2rem !important;
    }

    .layout-menu.menu-vertical.menu.bg-menu-theme.close:hover {
      width: var(--bs-width-menu-vertical) !important;
      z-index: 100;
    }

    .layout-menu.menu-vertical.menu.bg-menu-theme.close:hover .arrow{
      inset-inline-start: var(--bs-width-toggle-menu) !important;
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

    .menu-item .active {
      margin-top: 10px;
      cursor: pointer;
    }
</style>