<template>
    <div class="admin-pages">
      <PageTitle 
        icon="fa fa-cogs" 
        main="Configurações do Sistema" 
        sub="Painel do Administrador" 
      />
  
      <div class="admin-pages-tabs">
        <div class="col-xl-12 mt-5">
          <b-card class="nav-align-top" no-body> 
            <b-tabs pills card v-model="activeTab">
              <b-tab title="Artigos" :active="activeTab === 0">
                <ArticleAdmin v-if="activeTab === 0" />
              </b-tab>
              <b-tab title="Categorias" :active="activeTab === 1">
                <CategoryAdmin v-if="activeTab === 1" />
              </b-tab>
              <b-tab title="Usuários" :active="activeTab === 2">
                <UserAdmin v-if="activeTab === 2" />
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PageTitle from '@/components/template/PageTitle.vue'
  import ArticleAdmin from './ArticleAdmin.vue'
  import CategoryAdmin from './CategoryAdmin.vue'
  import UserAdmin from './UserAdmin.vue'
  
  export default {
    name: "AdminPages",
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
    data() {
      return {
        activeTab: 0
      }
    }
  }
  </script>
  
  <style scoped>
  .admin-pages {
    margin-top: 10px;
  }
  
  .nav-tabs {
    background: var(--bs-body-bg) !important;
  }
  </style>
  