<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria"/>

        <div class="mt-5 p-3">
            <ul>
                <li v-for="article in articles" :key="article.id">
                    <ArticleItem :article="article" />
                </li>
            </ul>

            <div class="load-more">
                <button v-if="loadMore" class="btn btn-md btn-outline-primary" @click="getArticles">Carregar Mais</button>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import ArticleItem from '@/components/article/ArticleItem'
import ArticleController from '@/api/ArticleController.js'
import CategoryController from '@/api/CategoryController.js'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        async getCategory() {
            this.category = await CategoryController.GetById(this.category.id)                 
        },
        async getArticles() {
            await ArticleController
                .GetPaged(this.page)
                .then(res => {
                    this.articles = this.articles.concat(res.items)
                    this.page++

                    console.log(this.articles)

                    if(res.items.length === 0) this.loadMore = false
                })
        }
    },
    async mounted() {
        this.category.id = this.$route.params.id
        await this.getCategory()
        await this.getArticles()        
    }
}
</script>

<style>

    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }

</style>