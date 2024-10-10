<template>
    <div class="article-item">
        <!-- <router-link :to="{ name: 'articleById', params: { id: article.id } }">
            <div class="article-item-image d-none d-sm-block">
                <img v-if="article.imageUrl" :src="article.imageUrl" height="150" width="150" alt="Article">
                <img v-else src="@/assets/images/article.png" height="150" width="150" alt="Article">
            </div>
            <div class="article-item-info">
                <h2>{{ article.name }}</h2>
                <p>{{ article.description }}</p>
                <span class="article-item-author">
                    <strong>Autor:</strong> {{ article.author }}
                </span>
            </div>
        </router-link> -->
        <router-link :to="{ name: 'articleById', params: { id: article.id } }">
            <div class="card">
                <div class="d-flex">
                    <div>
                    <img class="card-img card-img-left" v-if="article.imageUrl" :src="article.imageUrl" height="150" width="150" alt="Article">
                    <img class="card-img card-img-left" v-else src="@/assets/images/article.png" height="150" width="150" alt="Article">
                    </div>
                    <div>
                    <div class="card-body">
                        <h5 class="card-title">{{ article.name }}</h5>
                        <p class="card-text">
                        {{ article.description }}
                        </p>
                        <p class="card-text"><small class="text-muted"><strong>Autor:</strong> {{ article.author }}</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </router-link> 
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['article']
}
</script>

<style>
    .article-item {
        border-radius: 8px;                
        padding: 20px;
        border: 1px solid var(0, 0, 0, 0.2);
    }
</style>