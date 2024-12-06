<template>

    <div class="chat-messages">
        <div class="app-chat card overflow-hidden">
            <div class="row g-0">
                <div class="col app-chat-history">
                    <div class="chat-history-wrapper">
                        <div class="chat-history-header border-bottom">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex overflow-hidden align-items-center">   

                                    <template v-if="isSupport()">
                                        <div class="flex-shrink-0 avatar avatar-online">
                                            <Gravatar :email="this.supportMessage.email" alt="Usuário" class="rounded-circle" />
                                        </div>                                        
                                        <div class="chat-contact-info flex-grow-1 ms-4">
                                            <h6 class="m-0 fw-normal">{{ this.supportMessage.name }}</h6>
                                            <small class="user-status text-body">Support Chat</small>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="flex-shrink-0 avatar">
                                            <img src="@/assets/images/aiko-support.png" alt="Avatar" data-bs-toggle="sidebar" data-overlay="" data-target="#app-chat-sidebar-right" class="rounded-circle">
                                        </div>
                                        <div class="chat-contact-info flex-grow-1 ms-4">
                                            <h6 class="m-0 fw-normal">Aiko Digital</h6>
                                            <small class="user-status text-body">Support Chat</small>
                                        </div>
                                    </template>

                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="bx bx-phone bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1"></i><i class="bx bx-video bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1"></i><i class="bx bx-search bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1"></i>
                                    <div class="dropdown">
                                    <button data-bs-toggle="dropdown" aria-expanded="true" id="chat-header-actions" class="btn btn-icon text-secondary dropdown-toggle hide-arrow"><i class="bx bx-dots-vertical-rounded bx-md"></i></button>
                                    <div aria-labelledby="chat-header-actions" class="dropdown-menu dropdown-menu-end"><a href="javascript:void(0);" class="dropdown-item">View Contact</a><a href="javascript:void(0);" class="dropdown-item">Mute Notifications</a><a href="javascript:void(0);" class="dropdown-item">Block Contact</a><a href="javascript:void(0);" class="dropdown-item">Clear Chat</a><a href="javascript:void(0);" class="dropdown-item">Report</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="chat-history-body">
                            <Message 
                                v-for="(message, index) in messages"
                                :key="index"
                                :message="message"
                            />
                        </div>

                        <div class="chat-history-footer shadow-xs">
                            <div class="form-send-message d-flex justify-content-between align-items-center ">
                                <input 
                                    placeholder="Type your message here..." 
                                    class="form-control message-input border-0 me-4 shadow-none" 
                                    v-model="message.body"
                                >
                                <div class="message-actions d-flex align-items-center">
                                    <i class="speech-to-text bx bx-microphone bx-md btn btn-icon cursor-pointer text-heading"></i>
                                    <label for="attach-doc" class="form-label mb-0">
                                        <i class="bx bx-paperclip bx-md cursor-pointer btn btn-icon mx-1 text-heading"></i>
                                        <input type="file" id="attach-doc" hidden="hidden">
                                    </label>
                                    
                                    <button class="btn btn-primary d-flex send-msg-btn" @click="send">                                                
                                        <span class="align-middle d-md-inline-block d-none">Send</span>
                                        <i class="bx bx-paper-plane bx-sm ms-md-2 ms-0"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>            
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import ChatHub from '@/config/chatHub.js';
import Gravatar from 'vue-gravatar'
import Message from './Message.vue';

export default {
    name: 'Messages',
    components: { Gravatar, Message },
    computed: mapState(['currentTheme', 'user']),
    data() {
        return {            
            messages: [],
            message: {
                email: "",
                name: "",
                body: "",
                date: ""
            },
            supportMessage: {
                email: "",
                name: "",
                body: "",
                date: ""
            },
        }
    },
    mounted() {
        ChatHub.connection.on("ReceivedMessage", (msg) => {                    
            this.messages.push(msg);
            this.setSupportMessage();              
        });
    },
    methods: {
        send() {
            this.message.email = this.user.email
            this.message.name = this.user.name
            if(this.message.body == "") return;
            ChatHub.connection.invoke("SendMessage", this.message)
            this.message.body = ""
        },
        isSupport() {
            return this.supportMessage.email && this.supportMessage.email != this.user.email
        },
        setSupportMessage() {
            if(this.supportMessage.email == "") {
                const supportMessage = this.messages.find(m => m.email != this.user.email)
                
                if(supportMessage)
                    this.supportMessage = supportMessage
            }
        }
    }
}
</script>

<style>
.chat-messages {

    width: 500px;
}
</style>