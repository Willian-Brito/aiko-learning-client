<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder" :main="category.name" sub="Categoria"/>

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
    watch: {
        async $route(to) {
            this.category.id = to.params.id
            this.articles = []
            this.loadMore = true
            this.page = 1

            await this.getCategory()
            await this.getArticles() 
        }
    },
    methods: {
        async getCategory() {
            this.category = await CategoryController.GetById(this.category.id)                 
        },
        async getArticles() {
            const categoryId = this.category.id;

            await ArticleController
                .GetPagedByCategory(categoryId, this.page)
                .then(res => {
                    if(res.items)
                    {

                        this.articles = this.articles.concat(res.items)
                        this.page++
    
                        if(res.items && res.items.length === 0) this.loadMore = false
                    }
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