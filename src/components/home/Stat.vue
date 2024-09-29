<template>
    <!-- <div class="card">
        <div class="card-body"> -->
            <div class="stat">
                <div class="stat-icon">
                    <i :class="icon" :style="style"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-title">{{ title }}</span>
                    <span class="stat-value">{{ value }}</span>
                </div>
            </div>
        <!-- </div>
    </div> -->
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed:{
        style() {
            return "color: " + (this.color || "#22303e")
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        border-radius: var(--bs-border-radius);
        margin: 20px 0;
        background-color: var(--bs-white);
        padding: 20px;
        border: 1px solid var(--bs-border-color);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat:nth-child(2) {
        margin-right: 20px;
        margin-left: 20px;
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 5rem;
        
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        font-size: 1.2rem;
    }

    .stat-value {
        font-size: 3rem;
    }
</style>