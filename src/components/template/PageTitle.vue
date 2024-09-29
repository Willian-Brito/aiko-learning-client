<template>
    <div class="page-title">
        <div class="card">
            <h1 class="card-header page-title-card-header">
                <i v-if="icon" :class="icon"></i>
                {{ main }}
            </h1>
            <!-- <hr> -->
            <!-- <div class="card-body">

            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>

    .page-title {
        margin-top: 15px;
    }

    .page-title h1{
        font-size: 2rem;
    }

    .page-title i {
        margin-right: 5px;
    }

    .page-title h2 {
        color: var(--bs-navbar-color);
        font-size: 1.3rem;
    }

    .page-title-card-header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>