<template>
    <div class="article-admin mr-3">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-row class="mb-5">
                <b-col xs="12">
                    <b-form-group label="Nome:" label-for="article-name">
                        <b-form-input 
                            id="article-name" 
                            type="text" 
                            v-model="article.name"
                            required 
                            placeholder="Informe o Nome do Artigo..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-5">
                <b-col xs="12">
                    <b-form-group label="Descrição:" label-for="article-description">
                        <b-form-input 
                            id="article-description" 
                            type="text" 
                            v-model="article.description"
                            required 
                            placeholder="Informe a Descrição do Artigo..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-5">
                <b-col xs="12">
                    <b-form-group label="Imagem (URL):" label-for="article-imageUrl">
                        <b-form-input 
                            id="article-imageUrl" 
                            type="text" 
                            v-model="article.imageUrl"
                            required 
                            placeholder="Informe a URL da Imagem do Artigo..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-5">
                <b-col md="6" sm="12">
                    <b-form-group label="Categoria:" label-for="article-categoryId">
                        <b-form-select
                            class="form-select"
                            id="article-categoryId" 
                            v-model="article.categoryId" 
                            :options="selectCategories" 
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Autor:" label-for="article-userId">
                        <b-form-select
                            class="form-select"
                            id="article-userId" 
                            v-model="article.userId" 
                            :options="users" 
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row v-if="mode == 'save'">
                <b-col>
                    <b-form-group label="Conteúdo:" label-for="article-content">
                        <VueEditor 
                            class="custom-editor"
                            v-model="article.content"
                            placeholder="Informe o Conteúdo do Artigo..."                            
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12" class="mt-5">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                    <b-button style="margin-left: 10px" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table class="mt-5" hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" style="margin-right: 10px;">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i> 
                </b-button>
            </template>
        </b-table>
        <b-pagination 
            class="mt-5"
            size="md" 
            v-model="page" 
            :total-rows="count"
            :per-page="limit"
        />
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { showError } from '@/utils/utils.js'
import CategoryController from '@/api/CategoryController.js'
import UserController from '@/api/UserController.js'
import ArticleController from '@/api/ArticleController.js'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data() {
        return {
            mode: 'save',
            article: {
                name: '',
                categoryId: 0,
                userId: 0,
                description: '',
                imageUrl: '',
                content: null
            },
            articles: [],
            categories: [],
            selectCategories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    watch: {
        async page() {
            await this.loadArticles()
        }
    },
    methods: {
        async loadArticles() {
            await ArticleController
                .GetPaged(this.page)
                .then(res => {
                    this.articles = res.items
                    this.count = res.totalCount
                    this.limit = res.pageLimit
                })            
        },
        async loadCategories() {
            await CategoryController
                .GetCategoriesWithPath(this.page)
                .then(res => {
                    this.categories = res.items.map(category => {
                        return {value: category.id, text: category.path}
                    })
                })
        },
        async loadSelectCategories() {
            await CategoryController
                .GetCategoriesWithPath(this.page, 100)
                .then(res => {
                    this.selectCategories = res.items.map(category => {
                        return {...category, value: category.id, text: category.path}
                    })
                })
        },
        async loadUsers() {
            await UserController
                .GetAll()
                .then(res => {
                    this.users = res.map(user => {
                        return {value: user.id, text: `${user.name} - ${user.email}`}
                    })
                })
        },
        async loadArticle(article, mode = 'save') {
            this.mode = mode
            this.article = await ArticleController.GetById(article.id)
        },
        async save() {
            const method = this.article.id ? 'put' : 'post';
            const id = this.article.id ? `/${this.article.id}` : '';

            await ArticleController
                .Save(method, id, this.article)
                .then(async () => {
                    this.$toasted.global.defaultSuccess();
                    await this.reset();
                })
                .catch(showError);
        },
        async remove() {
            const id = this.article.id;

            await ArticleController
                .Delete(id)
                .then(async () => {
                    this.$toasted.global.defaultSuccess();
                    await this.reset();
                })
                .catch(showError);
        },
        async reset() {
            this.mode = 'save';
            this.article = {};
            await this.loadArticles();
        }
    },
    async mounted() {
        console.log('artigos')
        await this.loadCategories();
        await this.loadSelectCategories();
        await this.loadUsers();
        await this.loadArticles();

    }
}
</script>

<style>

.custom-editor .ql-toolbar .ql-fill {
  fill: var(--bs-text) !important;
}

.custom-editor .ql-toolbar .ql-stroke {
  stroke: var(--bs-text) !important;
}

.custom-editor .ql-toolbar .ql-active .ql-fill,
.custom-editor .ql-toolbar .ql-active .ql-stroke {
  fill: var(--bs-primary) !important; 
  stroke: var(--bs-primary) !important;
}

.custom-editor .ql-toolbar button svg {
  color: var(--bs-text) !important;
  fill: var(--bs-text) !important; 
  stroke: var(--bs-text) !important;
}

.custom-editor .ql-toolbar .ql-active button svg {
  color: var(--bs-primary) !important;
  fill: var(--bs-primary) !important;
  stroke: var(--bs-primary) !important;
}

span.ql-picker-label {
    color: var(--bs-text) !important;
}

.custom-editor .ql-editor::before {
  color: var(--bs-text) !important;
  font-style: italic;
  opacity: 0.6;
}

.ql-toolbar.ql-snow {
    border: 1px solid var(--bs-border-color) !important;
}

.ql-container.ql-snow {
    border: 1px solid var(--bs-border-color) !important;
}

</style>