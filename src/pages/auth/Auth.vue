<template>
    <div class="auth-content">
        <div class="card px-sm-6 px-0 auth-modal">
            <div class="card-body">

                <!-- Logo -->
                <div class="app-brand justify-content-center">
                <a href="index.html" class="app-brand-link gap-2">
                    <span class="app-brand-logo demo">
                        <img :src="getLogo" width="120" alt="Logo da Aiko">
                    </span>                  
                </a>
                </div>
                <!-- /Logo -->              

                <div v-if="showLogin" class="mb-6 mt-5">
                  <label for="email" class="form-label">Nome</label>
                  <input v-model="user.name" type="text" class="form-control" id="email" name="email-username" placeholder="Enter your name" autofocus="">
                </div>

                <div class="mb-6 mt-5">
                  <label for="email" class="form-label">E-mail</label>
                  <input v-model="user.email" type="text" class="form-control" id="email" name="email-username" placeholder="Enter your email" autofocus="">
                </div>

                <div class="mb-6 form-password-toggle">
                  <label class="form-label" for="password">Senha</label>
                  <div class="input-group input-group-merge">
                    <input v-model="user.password" type="password" id="password" class="form-control" name="password" placeholder="············" aria-describedby="password">
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>

                <div v-if="showLogin" class="mb-6 form-password-toggle">
                  <label class="form-label" for="password">Confirme a Senha</label>
                  <div class="input-group input-group-merge">
                    <input v-model="user.confirmPassword" type="password" id="password" class="form-control" name="password" placeholder="············" aria-describedby="password">
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>

                <div class="mb-6">                  
                  <button class="btn btn-primary d-grid w-100" v-if="showLogin" @click="register">Registrar</button>
                  <button class="btn btn-primary d-grid w-100" v-else @click="login">Entrar</button>
                </div>

              <p class="text-center">
                <span>{{showLogin ? 'Já tem cadastro? ' : 'Não tem cadastro?'}}</span>
                <a href @click.prevent="showLogin = !showLogin">
                    <span v-if="showLogin">Acesse Login!</span>
                    <span v-else> Registre-se aqui!</span>
                </a>
              </p>

            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { showError } from '@/utils/utils.js'
import { USER_KEY } from '@/config/environment.js'
import AuthController from '@/api/AuthController.js'

export default {
    name: 'Auth',
    data() {
        return {
            showLogin: false,
            user: {}
        }
    },
    computed: {
       ...mapState(['currentTheme']),
        getLogo() {
            return this.currentTheme == 'light-theme' 
                ? require('@/assets/images/logo.png') 
                : require('@/assets/images/logo-white.png')
        }
    },
    methods: {
        async login() {

            await AuthController
                .Login(this.user)
                .then(res => {                    

                    this.$store.commit('setUser', res)
                    localStorage.setItem(USER_KEY, JSON.stringify(res))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        },
        async register() {

            await AuthController
                .Register(this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showLogin = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        width: 400px; 
        border-radius: 4%; 
        box-shadow: 0px 5px 20px 1px rgb(0 0 0 / 15%);
    }
</style>