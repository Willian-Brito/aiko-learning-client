<template>
    <div class="navbar-nav align-items-center">
        <div class="nav-item d-flex align-items-center">
            <i class="bx bx-search bx-md"></i>
            <input
                type="text"
                class="form-control border-0 shadow-none ps-1 ps-sm-2"
                placeholder="Search..."
                aria-label="Search..."
                v-model="treeFilterLocal"
                @input="updateFilter"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "Search",
    data() {
        return {
            treeFilterLocal: ''
        }
    },
    methods: {
        updateFilter() {
            this.$store.dispatch('updateTreeFilter', this.treeFilterLocal);
        }
    }
}
</script>

<style>
</style>