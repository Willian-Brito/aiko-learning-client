<template>
    <div class="card mt-3">
        <div class="card-body">                
            <div class="d-flex align-items-start row">
                <div class="col-sm-9">
                    <div class="card-body">
                        <div class="col-11 col-lg-11 card-separator">
                            <h5 class="mb-2">Bem vindo de volta,<span class="h4"> {{ user.name }} 👋🏻</span></h5>
                            <div class="col-12 col-lg-5">
                                <p>Seu progresso esta semana é incrível. vamos continuar assim e ganhar muitos pontos de recompensa!</p>
                            </div>
                            <div class="d-flex justify-content-between flex-wrap gap-4 me-12">
                                <div class="d-flex align-items-center gap-4 me-6 me-sm-0">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-initial bg-label-primary rounded">
                                    <div>
                                        <img src="@/assets/images/svg/laptop.svg" alt="paypal" class="img-fluid">
                                    </div>
                                    </div>
                                </div>
                                <div class="content-right">
                                    <p class="mb-0 fw-medium">Hours Spent</p>
                                    <h4 class="text-primary mb-0">34h</h4>
                                </div>
                                </div>
                                <div class="d-flex align-items-center gap-4">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-initial bg-label-info rounded">
                                    <div>
                                        <img src="@/assets/images/svg/lightbulb.svg" alt="Lightbulb" class="img-fluid">
                                    </div>
                                    </div>
                                </div>
                                <div class="content-right">
                                    <p class="mb-0 fw-medium">Test Results</p>
                                    <h4 class="text-info mb-0">82%</h4>
                                </div>
                                </div>
                                <div class="d-flex align-items-center gap-4">
                                <div class="avatar avatar-lg">
                                    <div class="avatar-initial bg-label-warning rounded">
                                    <div>
                                        <img src="@/assets/images/svg/check.svg" alt="Check" class="img-fluid">
                                    </div>
                                    </div>
                                </div>
                                <div class="content-right">
                                    <p class="mb-0 fw-medium">Course Completed </p>
                                    <h4 class="text-warning mb-0">14</h4>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
                <div class="col-sm-2 text-center text-sm-left">
                    <div class="card-body pb-0 px-0 px-md-6">
                        <img src="@/assets/images/illustrations/man-with-laptop.png" height="175" class="scaleX-n1-rtl" alt="View Badge User">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Welcome',
    computed: mapState(['user']),
}
</script>

<style>
</style>