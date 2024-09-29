<template>
    <footer class="footer">
        <span>Copyright <strong>Aiko Digital</strong> © 2024</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>

    .footer {
        grid-area: footer;
        background-color: #ebebeb;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 50px;
        box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.1);
    }
</style>