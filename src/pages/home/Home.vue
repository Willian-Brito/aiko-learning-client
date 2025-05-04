<template>
    <div class="home">
        <!-- <PageTitle 
            icon="fa fa-home" 
            main="Dashboard" 
            sub="Base de Conhecimento" 
        /> -->
        <Welcome />
        <!-- avatar-initial rounded bg-label-danger -->
        <div class="stats"> 
            <Stat 
                title="Categorias" 
                :value="stat.categoriesCount" 
                type="avatar-initial rounded bg-label-danger"
                icon="fa fa-folder" 
                color="#d54d50" 
                class="card card-border-shadow-danger h-100" 
                style="display: flex; flex-direction: row;"/>

            <Stat 
                title="Artigos" 
                :value="stat.articlesCount" 
                type="avatar-initial rounded bg-label-info"
                icon="fa fa-file" 
                color="#03c3ec" 
                class="card card-border-shadow-info h-100" 
                style="display: flex; flex-direction: row;"/>

            <Stat 
                title="Usuários" 
                :value="stat.usersCount" 
                type="avatar-initial rounded bg-label-primary"
                icon="fa fa-user" 
                color="#696cff" 
                style="display: flex; flex-direction: row;"
                class="card card-border-shadow-primary h-100"/>
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