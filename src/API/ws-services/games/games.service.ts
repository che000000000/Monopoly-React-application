import { io, Socket } from "socket.io-client"
import { AppDispatch } from "../../../store"
import { pushGameChatMessage, pushGameChatMessagesPage, setCurrentGame, setIsGatewayConnected } from "../../../store/slices/games/games-slice"

export class GamesGatewayService {
    private socket: Socket | null = null
    private dispatch

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch
    }

    connect() {
        this.socket = io('http://localhost:7507/games', {
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
        this.socket?.on('game-state', (message) => {
            this.dispatch(setCurrentGame(message.gameState))
        })
        this.socket?.on('game-chat-messages-page', (message) => {
            this.dispatch(pushGameChatMessagesPage(message))
        })
        this.socket?.on('send-game-chat-message', (message) => {
            this.dispatch(pushGameChatMessage(message.message))
        })
    }

    public startGame() {
        this.socket?.emit('start-game', {})
    }

    public getGameState() {
        this.socket?.emit('game-state', {})
    }

    public getGameChatMessagesPage(pageNumber: number, pageSize: number) {
        this.socket?.emit('game-chat-messages-page', { pageNumber, pageSize })
    }

    public sendGameChatMessage(messageText: string) {
        this.socket?.emit('send-game-chat-message', { messageText })
    }
}