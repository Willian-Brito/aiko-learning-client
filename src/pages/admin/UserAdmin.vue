<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row class="mb-5">
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input 
                            id="user-name" 
                            type="text" 
                            v-model="user.name"
                            required 
                            placeholder="Informe o Nome do Usuário..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input 
                            id="user-email" 
                            type="text" 
                            v-model="user.email"
                            required 
                            placeholder="Informe o E-mail do Usuário..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row v-if="mode === 'save'" class="mb-5">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input 
                            id="user-password" 
                            type="password" 
                            v-model="user.password"
                            required 
                            placeholder="Informe a Senha do Usuário..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
                        <b-form-input 
                            id="user-confirm-password" 
                            type="password" 
                            v-model="user.confirmPassword"
                            required 
                            placeholder="Confirme a Senha do Usuário..."
                            :disabled="mode == 'remove'"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <label class="col-form-label pt-0">Permissões:</label>
            <div class="roles">
                <div v-if="allRoles.length" v-for="(role, index) in allRoles" :key="index">
                    <div class="form-check form-check-inline mt-3">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            :disabled="mode === 'remove'" 
                            :id="`${role}-${index}`" 
                            :value="index" 
                            v-model="selectedRoles"
                        >
                        <label 
                            class="form-check-label" 
                            :for="`${role}-${index}`">{{ role == 'Administrator' ? 'Administrador' : 'Comum' }}
                        </label>
                    </div>
                </div>
                <div v-else>
                    <p>Nenhuma role disponível</p>
                </div>
            </div>
            <b-row>
                <b-col xs="12" class="mt-5">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                    <b-button style="margin-left: 10px" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table class="mt-5" hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" style="margin-right: 10px;">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
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
import UserController from '@/api/UserController.js'

export default {
    name: 'UserAdmin',
    data() {
        return {
            mode: 'save',
            allRoles: [],
            page: 1,
            limit: 0,
            count: 0,
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                roles: []
            },
            users: [],
            selectedRoles: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'roles', label: 'Perfil', sortable: false,
                    formatter: value => value == 'Administrator' ? 'Administrador' : 'Comum' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    watch: {
        async page() {
            await this.loadUsers()
        }
    },
    methods: {
        async loadUsers() {
            await UserController
                .GetPaged(this.page)
                .then(res => {
                    this.users = res.items
                    this.count = res.totalCount
                    this.limit = res.pageLimit
                }) 
        },
        async loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = user
            this.selectedRoles = this.user.roles.map(role => this.allRoles.indexOf(role));
        },
        async save() {
            const method = this.user.id ? 'put' : 'post';
            const id = this.user.id ? `/${this.user.id}` : '';
            this.user.roles = this.selectedRoles;

            await UserController
                .Save(method, id, this.user)
                .then(async () => {
                    this.$toasted.global.defaultSuccess();
                    await this.reset();
                })
                .catch(showError);
        },
        async remove() {
            const id = this.user.id;

            await UserController
                .Delete(id)
                .then(async () => {
                    this.$toasted.global.defaultSuccess();
                    await this.reset();
                })
                .catch(showError);
        },
        async reset() {
            this.mode = 'save';
            this.user = { roles: [] };
            this.selectedRoles = []
            await this.loadUsers();
        }
    },
    async mounted() {
        await this.loadUsers();
        this.allRoles = await UserController.GetAllRoles();
    }
}
</script>

<style scoped>
    
</style>
