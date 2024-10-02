<template>
    <header v-if="showHeader">
        <nav 
            class="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
              <a class="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
                <i class="bx bx-menu bx-md"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <!-- Search -->
              <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                  <i class="bx bx-search bx-md"></i>
                  <input
                    type="text"
                    class="form-control border-0 shadow-none ps-1 ps-sm-2"
                    placeholder="Search..."
                    aria-label="Search..." />
                </div>
              </div>
              <!-- /Search -->

              <ul class="navbar-nav flex-row align-items-center ms-auto">

                <!-- Theme -->
                <div class="d-flex">
                    <div class="btn-menu" @click="openLink('https://github.com/Willian-Brito/aiko-learning-client')">
                        <i class='bx bxl-github'></i>                        
                    </div>                    
                    <div class="btn-menu">
                        <i class='bx bx-bell'></i>
                    </div>
                    <div class="btn-menu" @click="toggleTheme">
                        <i :class="currentTheme == 'light' ? 'bx bx-sun' : 'bx bx-moon'"></i>
                    </div>
                </div>
                <!-- /Theme -->

                <!-- User -->
                <UserDropdown />
                <!--/ User -->
              </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue';
import { mapState } from 'vuex'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
      showHeader: Boolean
    },
    computed: mapState(['currentTheme']),
    methods: {
        openLink(link) {
            window.open(link, '_blank');
        },
        toggleTheme() {
            document.body.classList.toggle('dark-theme');
            this.$store.commit('toggleTheme')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 38px; 
        width: 38px;
        margin-right: 10px;
        cursor: pointer;
        color: var(--bs-color-icon);
    }

    .btn-menu:hover {
        border-radius: 50%;
        background-color: var(--bs-btn-hover);
    }
</style>