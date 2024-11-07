<template>
    <div class="profile">
        <PageTitle 
            icon="fa fa-user" 
            main="Perfil do Usuário" 
            sub="Alterar Senha" 
        />
        <div class="card user-profile">
            <b-form>
                <div class="user-avatar-img">
                    <Gravatar :email="user.email" alt="Usuário"/>
                </div>
                
                <b-row class="mb-5 mt-5">
                    <b-col md="6" sm="12">
                        <b-form-group label="Nome:" label-for="user-name">
                            <b-form-input 
                                id="user-name" 
                                type="text" 
                                v-model="user.name"
                                required 
                                placeholder="Informe o Nome do Usuário..."                                
                                :disabled="true"
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
                                :disabled="true"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="mb-5">
                    <b-col md="6" sm="12">
                        <b-form-group label="Senha:" label-for="user-password">
                            <b-form-input 
                                id="user-password" 
                                type="password" 
                                v-model="user.password"                                
                                required 
                                placeholder="Informe a Senha do Usuário..."                        
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
                                :disabled="true" 
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
                        <b-button variant="primary" @click="changePassword">Alterar Senha</b-button>                        
                    </b-col>
                </b-row>
            </b-form>
        </div>

    </div>
</template>

<script>
import Gravatar from 'vue-gravatar'
import { showError } from '@/utils/utils.js'
import UserController from '@/api/UserController.js'
import PageTitle from '@/components/template/PageTitle.vue'

export default {
    name: 'Profile',
    components: { Gravatar, PageTitle },
    props: ['id'],
    data() {
        return {
            allRoles: [],
            user: {},
            selectedRoles: []
        }
    },
    mounted() {
        this.user = this.$store.state.user
        this.allRoles = this.user.roles
        this.selectedRoles = this.user.roles.map(role => this.allRoles.indexOf(role));
    },
    methods: {
        async changePassword() {            
            const path = `/${this.user.id}`
            const user = {
                id: this.user.id,
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                confirmPassword: this.user.confirmPassword,
                roles: this.selectedRoles
            }

            await UserController
                .Save('put', path, user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        reset() {
            this.user.password = ''
            this.user.confirmPassword = ''
        }
    }
}
</script>

<style>
    .user-avatar-img {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 10px;
    }

    .user-avatar-img > img {
        max-height: 100px;
        max-width: 100px;
        border-radius: 10%;
    }

    .user-profile {
        margin-top: 20px;
        padding: 30px;
    }
</style>
