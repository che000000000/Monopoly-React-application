import { io, Socket } from "socket.io-client"
import { AppDispatch } from "../../../store"
import { pushGlobalChatMessage, pushGlobalChatMessagesPage, setIsGatewayConnected } from "../../../store/slices/global-chat/global-chat-slice"

export class GlobalChatGatewayService {
    private socket: Socket | null = null
    private dispatch

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch
    }

    connect() {
        this.socket = io('http://localhost:7507/global-chat', {
            withCredentials: true
        })

        this.setupListeners()
    }

    disconnect() {
        this.socket?.disconnect()
        this.socket = null
    }

    private setupListeners() {
        this.socket?.on('connect', () => {
            this.dispatch(setIsGatewayConnected(true))
        })
        this.socket?.on('disconnect', () => {
            this.dispatch(setIsGatewayConnected(false))
        })
        this.socket?.on('global-chat-messages-page', (message) => {
            this.dispatch(pushGlobalChatMessagesPage(message))
        })
        this.socket?.on('send-global-chat-message', (message) => {
            this.dispatch(pushGlobalChatMessage(message.message))
        })
    }

    public getGlobalChatMessagesPage(pageNumber?: number | null, pageSize?: number | null) {
        this.socket?.emit('global-chat-messages-page', { pageNumber, pageSize })
    }

    public sendGlobalChatMessage(messageText: string) {
        this.socket?.emit('send-global-chat-message', { messageText })
    }
}