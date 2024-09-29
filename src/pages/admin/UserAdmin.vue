<template>
    <div class="user-admin">
        <b-table hover striped :items="users" :fields="fields">

        </b-table>
    </div>
</template>

<script>
import UserController from '@/api/UserController.js'

export default {
    name: 'UserAdmin',
    data() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'roles', label: 'Perfil', sortable: true, 
                    formatter: value => value == 'Administrator' ? 'Administrador' : "Comum" },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        async loadUsers() {
            this.users = await UserController.GetAll();
        }
    },
    async mounted() {
        await this.loadUsers()
    }
}
</script>

<style>
</style>