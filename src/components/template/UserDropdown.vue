<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img avatar avatar-online">
                <Gravatar :email="user.email" alt="Usuário"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <!-- <a href><i class="fa fa-cogs"></i>Administração</a>
            <a href><i class="fa fa-sign-out"></i>Sair</a> -->

            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <ul class="dropdown-menu dropdown-menu-end show">
                <li>
                    <div class="d-flex" style="cursor: default;">
                        <div class="flex-shrink-0 me-3">
                        <div class="user-dropdown-img avatar avatar-online">
                            <Gravatar :email="user.email" alt="Usuário"/>
                        </div>
                        </div>
                        <div class="flex-grow-1">
                        <h6 class="mb-0">{{ user.name }}</h6>
                        <small class="text-muted">{{ user.isAdmin ? 'Admin' : 'Common' }}</small>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="dropdown-divider my-1"></div>
                </li>
                <li>
                    <a class="dropdown-item" href="#">
                    <i class="bx bx-user bx-md"></i><span>Perfil</span>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item" href="#"> <i class="bx bx-cog bx-md"></i><span>Configurações</span> </a>
                </li>
                <li>
                    <div class="dropdown-divider my-1"></div>
                </li>
                <li>
                    <a class="dropdown-item" href="javascript:void(0);">
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
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user'])
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
        color: var(--bs-navbar-hover-color);
        font-weight: 100;
        height: 100%;
        padding: 0px 5px;
    }

    .user-dropdown:hover {
        background-color: var(--bs-btn-hover);
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
       transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: var(--bs-navbar-hover-color);
        padding: 5px;
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