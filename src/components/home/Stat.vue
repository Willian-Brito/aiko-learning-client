<template>    
    <!-- <div class="card-body"> -->
        <div class="stat">
            <div :class="type" style="display: flex;">
                <span class="stat-icon">
                    <i :class="icon" :style="style"></i>
                </span>
            </div>
            <div class="stat-info">
                <span class="stat-title">{{ title }}</span>
                <span class="stat-value">{{ value }}</span>
            </div>
        </div>


        <!-- <div class="stat">
            <div class="card card-border-shadow-primary h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-2">
                        <div class="avatar me-4">
                            <span class="avatar-initial rounded bg-label-primary">
                                <i :class="icon"></i>
                            </span>
                        </div>                        
                    </div>
                    <div class="stat-info">
                        <span class="stat-title">{{ title }}</span>
                        <span class="stat-value">{{ value }}</span>
                    </div>
                </div>
            </div>
        </div> -->
    <!-- </div>     -->
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color', 'type'],
    computed:{
        style() {
            return "color: " + (this.color || "#22303e")
        }
    }
}
</script>

<style scoped>
    .stat {
        flex: 1;
        display: flex;
        border-radius: var(--bs-border-radius);
        margin: 20px 5px;
        background-color: var(--bs-color-light);
        padding: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    /* .stat:nth-child(2) {
        margin-right: 20px;
        margin-left: 20px;
    } */

    .stat-icon {
        display: flex;
        align-items: center;
        width: 100px;
        justify-content: center;
    }

    .stat-icon i {
        font-size: 3rem;
        
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