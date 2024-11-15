<template>
    <div class="user-dropdown" @click="showUserDropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img avatar avatar-online">
                <Gravatar :email="user.email" alt="Usuário"/>
            </div>
            <i :class="isVisible ? 'fa fa-angle-down' : 'fa fa-angle-up'"></i>
        </div>
        <div :class="['user-dropdown-content', { 'show': isVisible }]">

            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <ul class="dropdown-menu dropdown-menu-end show">
                <li>
                    <div class="d-flex" style="cursor: default;">
                        <div class="flex-shrink-0 me-3">
                        <div class="user-dropdown-img avatar avatar-online">
                            <Gravatar :email="user.email" alt="Usuário" />
                        </div>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-0" style="color: var(--bs-color-icon)">{{ user.name }}</h6>
                            <small class="text-muted">{{ user.roles.includes('Administrator') ? 'Admin' : 'Comum' }}</small>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="dropdown-divider my-1"></div>
                </li>
                <li>
                    <router-link to="/profile" class="dropdown-item" style="color: var(--bs-color-icon)">
                        <i class="bx bx-user bx-md"></i><span>Perfil</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin" v-if="user.roles.includes('Administrator')" class="dropdown-item" style="color: var(--bs-color-icon)">
                        <i class="bx bx-cog bx-md"></i>
                        <span>Configurações</span> 
                    </router-link>
                </li>
                <li>
                    <div class="dropdown-divider my-1"></div>
                </li>
                <li>
                    <a @click.prevent="logout" class="dropdown-item" style="color: var(--bs-color-icon)">
                        <i class="bx bx-power-off bx-md"></i><span>Sair</span>
                    </a>
                </li>
                </ul>
            </li> 
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { USER_KEY } from '@/config/environment.js'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    data() {
        return {
            isVisible: false,
            isAdmin: false
        }
    },
    computed: mapState(['user']),
    methods: {
        showUserDropdown() {
            this.isVisible = !this.isVisible;
        },
        logout() {
            localStorage.removeItem(USER_KEY)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 40px;
        cursor: pointer;
    }

    .user-button {
        display: flex;
        align-items: center;
        /* color: var(--bs-navbar-hover-color); */
        font-weight: 100;
        height: 100%;
        padding: 0px 5px;
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 36px;
        border-radius: 50%;
    }

    .user-dropdown-content {
       position: absolute;
       margin-top: 15px;
       right: 30px;
       background-color: var(--bs-white);
       min-width: 170px;
       box-shadow: var(--bs-box-shadow-sm);
       z-index: 1;
       border-radius: 7%;

       display: flex;
       flex-direction: column;
       flex-wrap: wrap;

       visibility: hidden;
       opacity: 0;   
       transition: visibility 0s, opacity 0.3s linear;
    }

    .user-dropdown-content.show {
        visibility: visible !important;
        opacity: 1 !important;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: var(--bs-navbar-hover-color);
    }

    .user-dropdown-content a:hover {
        text-decoration: none;
        color: var(--bs-navbar-hover-color);
        background-color: var(--bs-btn-hover);
    }

    .user-dropdown-content a i {
        margin: 0px 5px;
    } 
</style>