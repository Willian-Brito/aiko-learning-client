<template>
    <div class="category-admin">
        <b-form>
            <input id="category-id" type="hidden" v-model="category.id" />
            <b-row class="mb-5">
                <b-col xs="12">
                    <b-form-group label="Nome:" label-for="category-name">
                        <b-form-input 
                            id="category-name" 
                            type="text" 
                            v-model="category.name"
                            required 
                            placeholder="Informe o Nome da Categoria..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Categoria Pai:" label-for="category-parentId">
                        <b-form-select
                            class="form-select"
                            id="category-parentId" 
                            v-model="category.parentId" 
                            :options="selectCategories" 
                            :disabled="mode == 'remove'"
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

        <b-table class="mt-5" hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" style="margin-right: 10px;">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
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
import { showError } from '@/utils/utils.js'
import CategoryController from '@/api/CategoryController.js'

export default {
    name: 'CategoryAdmin',
    data() {
        return {
            mode: 'save',
            page: 1,
            limit: 0,
            count: 0,
            selectCategories: [],
            category: {
                name: '',
                path: '',
                parentId: 0,
            },
            categories: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: false },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    watch: {
        async page() {
            await this.loadCategories()
        }
    },
    methods: {
        async loadCategories() {
            await CategoryController
                .GetCategoriesWithPath(this.page)
                .then(res => {
                    this.categories = res.items.map(category => {
                        return {...category, value: category.id, text: category.path}
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
        async loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { 
                id: category.id,
                name: category.name,
                parentId: category.parentId
            }
        },
        async save() {
            const method = this.category.id ? 'put' : 'post';
            const id = this.category.id ? `/${this.category.id}` : '';

            await CategoryController
                .Save(method, id, this.category)
                .then(async () => {
                    this.$toasted.global.defaultSuccess();
                    await this.reset();
                })
                .catch(showError);
        },
        async remove() {
            const id = this.category.id;

            await CategoryController
                .Delete(id)
                .then(async () => {
                    this.$toasted.global.defaultSuccess();
                    await this.reset();
                })
                .catch(showError);
        },
        async reset() {
            this.mode = 'save';
            this.category = {};
            await this.loadCategories();
        }
    },
    async mounted() {
        console.log('categoria')
        await this.loadCategories();
        await this.loadSelectCategories();

    }
}
</script>

<style>
</style>