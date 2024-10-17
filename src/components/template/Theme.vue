<template>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Theme',
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

</style>