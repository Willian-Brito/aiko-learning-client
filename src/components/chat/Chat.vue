<template>
    <div class="chat">
        <div class="chat" @click="openChat">            
            <div class="intercom-launcher  intercom-1fcw5g2 e11rlguj4">
                <div data-testid="launcher-default-open-icon" class="intercom-1paricb">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 28 32" width="24" height="24">
                        <path d="M28,32 C28,32 23.2863266,30.1450667 19.4727818,28.6592 L3.43749107,28.6592 C1.53921989,28.6592 0,27.0272 0,25.0144 L0,3.6448 C0,1.632 1.53921989,0 3.43749107,0 L24.5615088,0 C26.45978,0 27.9989999,1.632 27.9989999,3.6448 L27.9989999,22.0490667 L28,22.0490667 L28,32 Z M23.8614088,20.0181333 C23.5309223,19.6105242 22.9540812,19.5633836 22.5692242,19.9125333 C22.5392199,19.9392 19.5537934,22.5941333 13.9989999,22.5941333 C8.51321617,22.5941333 5.48178311,19.9584 5.4277754,19.9104 C5.04295119,19.5629428 4.46760991,19.6105095 4.13759108,20.0170667 C3.97913051,20.2124916 3.9004494,20.4673395 3.91904357,20.7249415 C3.93763774,20.9825435 4.05196575,21.2215447 4.23660523,21.3888 C4.37862552,21.5168 7.77411059,24.5386667 13.9989999,24.5386667 C20.2248893,24.5386667 23.6203743,21.5168 23.7623946,21.3888 C23.9467342,21.2215726 24.0608642,20.9827905 24.0794539,20.7254507 C24.0980436,20.4681109 24.0195551,20.2135019 23.8614088,20.0181333 Z" fill="white"></path>                        
                    </svg>
                </div>
            </div>
        </div>
        <transition name="slide-in-left">
            <Messages v-show="open"/>
        </transition>
    </div>
</template>

<script>
import Messages from './Messages.vue';

export default {
    name: 'Chat',
    components: { Messages },
    data() {
        return {
            open: false
        }
    },
    methods: {
        openChat() {
            this.open = !this.open
        }
    }
}
</script>

<style>
    .chat {
        position: fixed;
        /* width: 30px;
        height: 30px; */
        bottom: 100px;
        right: 80px; 
    }

    .intercom-1fcw5g2 {
        position: absolute;
        top: 0px;
        left: 0px;
        /* background: rgb(55, 90, 242); */
        background: var(--bs-primary);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
        backface-visibility: hidden;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        z-index: 100;
    }

    .intercom-1paricb {
        user-select: none;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        transition: transform 0.16s linear, opacity 0.08s linear;
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    .intercom-dud02y {
        user-select: none;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        transition: transform 0.16s linear, opacity 0.08s linear;
        opacity: 0;
        transform: rotate(-60deg);
    }

    .intercom-launcher::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--bs-primary);
        transition: .5s;
        transform: scale(.9);
        /* z-index: -1; */
    }

    .intercom-launcher:hover::before {
        transform: scale(1.1);
        box-shadow: 0 0 15px var(--bs-primary);
    }

    .intercom-launcher:hover {
        color: var(--bs-primary);
        box-shadow: 0 0 15px var(--bs-primary);
        text-shadow: 0 0 15px var(--bs-primary);
    }
</style>