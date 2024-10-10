<template>
    <div class="page-title">
        <div class="card page-title-box">
            <div class="page-title-main">
                <i v-if="icon" :class="icon"></i>
                {{ main }}
            </div>
            <div class="page-title-sub">{{ sub }}</div>
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
        margin-right: 10px;
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

    .page-title-box {
        padding: 10px;
    }

    .page-title-main {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }

    .page-title-sub {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        color: var(--bs-subtitle-color);
    }
</style>