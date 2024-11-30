<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file" :main="article.name" :sub="article.description"/>
        <div class="card mt-5 p-5" v-html="article.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import PageTitle from '@/components/template/PageTitle'
import ArticleController from '@/api/ArticleController.js'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data() {
        return {
            article: {}
        }
    },
    async mounted() {
        const id = this.$route.params.id
        this.article = await ArticleController.GetById(id)        
    },
    updated() {
        document.querySelectorAll('pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        }) 

        document.querySelectorAll('pre[spellcheck]').forEach(e => {
            hljs.highlightBlock(e)
        }) 
    }
}
</script>

<style>

    .article-content {
        background-color: var(--bs-white);
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: var(--bs-white);
    }

    .article-content img {
        max-width: 100%
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }

</style>