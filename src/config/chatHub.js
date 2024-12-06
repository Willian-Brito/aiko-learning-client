import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr"
import { BASE_API_URL } from '@/config/environment.js'

class ChatHub {
    constructor() {

        this.connection = new HubConnectionBuilder()
            .withUrl(`${BASE_API_URL}/chat`)
            .configureLogging(LogLevel.Information)
            .build();

        this.startConnection();
    }

    async startConnection() {
        try {
            await this.connection.start();
            console.log("Conectado ao SignalR com sucesso!");
        } catch (err) {
            console.error("Erro ao conectar ao SignalR:", err);
        }
    }
}

export default new ChatHub();