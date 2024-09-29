<template>
    <div class="home">
        <!-- <PageTitle 
            icon="fa fa-home" 
            main="Dashboard" 
            sub="Base de Conhecimento" 
        /> -->
        <Welcome />
        <div class="stats">
            <Stat title="Categorias" :value="stat.categoriesCount" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.articlesCount" icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.usersCount" icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue'
import StatController from '@/api/StatController.js'
import Stat from '@/components/home/Stat.vue'
import Welcome from '@/components/home/Welcome.vue'

export default {
    name: "Home",
    components: { PageTitle, Stat, Welcome },
    data() {
        return {
            stat: {}
        }
    },
    async mounted() {
        this.stat = await StatController.GetLast();        
    }
}
</script>

<style scoped>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>