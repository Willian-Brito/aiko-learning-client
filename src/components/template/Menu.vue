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

    <div class="menu-inner-shadow" style="display: block;"></div>

    <!-- <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/> -->
    
    <!-- <ul class="menu-inner py-1 ps ps--active-y">
      <Tree :data="treeData" :options="treeOptions" ref="tree"/>
    </ul> -->

    <div role="tree" class="tree">
      <ul class="menu-inner py-1 ps ps--active-y">
        <li class="menu-item active open" style="">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons bx bx-home-smile"></i>
              <div class="text-truncate" data-i18n="Dashboards">Dashboards</div>
              <span class="badge rounded-pill bg-danger ms-auto">5</span>
            </a>
            <ul class="menu-sub">
              <li class="menu-item active">
                <a href="index.html" class="menu-link">
                  <div class="text-truncate" data-i18n="Analytics">Analytics</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/dashboards-crm.html" target="_blank" class="menu-link">
                  <div class="text-truncate" data-i18n="CRM">CRM</div>
                  <div class="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">Pro</div>
                </a>
              </li>
              <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/>
            </ul>
          </li>
  
          <li class="menu-item active">
            <a class="menu-link">
              <i class="menu-icon tf-icons bx bx-collection"></i>
              <div class="text-truncate" data-i18n="Basic">Cards</div>
              
            </a>
          </li>
       </ul>

    </div>


    <div role="tree" class="tree">
      <ul class="tree-root">
          <li class="tree-node has-child expanded selected">
            <div class="tree-content" style="padding-left: 0px;">
                <i class="tree-arrow expanded has-child"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Back-End</span></a>
            </div>
            <ul class="tree-children">
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Linguagem</span></a>
                  </div>
                  <!---->
                </li>
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Banco de Dados</span></a>
                  </div>
                  <!---->
                </li>
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Linguagem</span></a>
                  </div>
                  <!---->
                </li>
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Lógica de Programação</span></a>
                  </div>
                  <!---->
                </li>
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Design Patterns</span></a>
                  </div>
                  <!---->
                </li>
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Testes Automátizados</span></a>
                  </div>
                  <!---->
                </li>
                <li class="tree-node">
                  <div class="tree-content" style="padding-left: 24px;">
                      <i class="tree-arrow"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Arquitetura</span></a>
                  </div>
                  <!---->
                </li>
            </ul>
          </li>
          <li class="tree-node has-child">
            <div class="tree-content" style="padding-left: 0px;">
                <i class="tree-arrow has-child"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Front-End</span></a>
            </div>
            <!---->
          </li>
          <li class="tree-node has-child">
            <div class="tree-content" style="padding-left: 0px;">
                <i class="tree-arrow has-child"></i> <!----> <a href="javascript:void(0)" tabindex="1" class="tree-anchor"><span>Mobile</span></a>
            </div>
            <!---->
          </li>
      </ul>
    </div>

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
      return this.currentTheme == 'light-theme' 
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

      if(this.$mq === 'xs' || this.$mq === 'sm') {
        this.$store.commit('toggleMenu', false)
      }
    },
    teste() {
      // Seleciona todos os elementos <li> com a classe "tree-node"
      const treeNodes = document.querySelectorAll('.tree-node');

      treeNodes.forEach(treeNode => {
          // Encontra o <ul class="menu-sub"> mais próximo
          const menuSub = treeNode.closest('ul.menu-sub');
          
          if (menuSub) {
              // Cria a nova estrutura <li> com as classes e conteúdo desejados
              const newMenuItem = document.createElement('li');
              newMenuItem.className = 'menu-item';

              const anchor = document.createElement('a');
              anchor.href = 'javascript:void(0);';
              anchor.className = 'menu-link menu-toggle';

              const textContainer = document.createElement('div');
              textContainer.className = 'text-truncate';

              // Pega o texto do elemento <span> dentro do .tree-anchor e define no novo elemento
              const spanText = treeNode.querySelector('.tree-anchor span').textContent;
              textContainer.textContent = spanText;

              // Adiciona textContainer dentro do link, e o link dentro do item <li>
              anchor.appendChild(textContainer);
              newMenuItem.appendChild(anchor);

              // Adiciona o novo item <li> ao <ul class="menu-sub"> mais próximo
              menuSub.appendChild(newMenuItem);

              // Remove o elemento original
              treeNode.remove();
          }
      });

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