<template>
    <div>        
        <ul class="list-unstyled chat-history">
            <li :class="['chat-message', {'chat-message-right': currentUser}]" v-if="currentUser">
                <div class="d-flex overflow-hidden">
                <div class="chat-message-wrapper flex-grow-1">
                    <div class="chat-message-text">
                        <p class="mb-0 text-break">{{ message.body }}</p>
                    </div>
                    <div class="text-end text-muted mt-1"><i class="bx bx-check-double bx-16px text-success me-1"></i><small>{{ formatDate(message.date) }}</small></div>
                </div>
                <div class="user-avatar flex-shrink-0 ms-4">
                    <div class="avatar avatar-sm avatar-online">                                                    
                        <Gravatar :email="user.email" alt="Usuário" class="rounded-circle" />
                    </div>
                </div>
                </div>
            </li>
            <li :class="['chat-message', {'': currentUser} ]" v-else>
                <div class="d-flex overflow-hidden">
                <div class="user-avatar flex-shrink-0 me-4">
                    <div class="avatar avatar-sm avatar-online">                        
                        <Gravatar :email="message.email" alt="Usuário" class="rounded-circle" />
                    </div>
                </div>
                <div class="chat-message-wrapper flex-grow-1">
                    <div class="chat-message-text">
                        <p class="mb-0 text-break">{{ message.body }}</p>
                    </div>
                    <div class="text-muted mt-1"><small>{{ formatDate(message.date) }}</small></div>
                </div>
                </div>
            </li>
        </ul>

        <div class="ps__rail-x" style="left: 0px; bottom: -658px;">
            <div tabindex="0" class="ps__thumb-x" style="left: 0px; width: 0px;"></div>
        </div>
        <div class="ps__rail-y" style="top: 658px; height: 558px; right: 0px;">
            <div tabindex="0" class="ps__thumb-y" style="top: 302px; height: 256px;"></div>
        </div>        
    </div>
</template>

<script>
import { formatDate } from '@/utils/utils.js'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'Message',
    components: { Gravatar },
    props: {
        message: {
            email: "",
            name: "",
            body: "",
            date: ""
        }
    },
    computed: {
        ...mapState(['currentTheme', 'user']),
        currentUser() {            
            return this.message.email == this.user.email
        }
    },
    methods: {
        formatDate(date) {
            return formatDate(date)
        }
    }
}
</script>

<style>
.chat-history-body {
    overflow-y: auto;
}
</style>