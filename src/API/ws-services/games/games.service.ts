import { io, Socket } from "socket.io-client"
import { AppDispatch } from "../../../store"
import { pushGame, pushGameChatMessage, pushGameChatMessagesPage, pushGamesPage, setCurrentGame, setDices, setGameTurn, setIsGatewayConnected, setStartGameFlag, updateGameField, updatePlayer } from "../../../store/slices/games/games-slice"

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
        this.socket?.on('exceptions', (message) => {
            console.log(message)
        })
        this.socket?.on('start-game', (message) => {
            this.dispatch(setCurrentGame(message.gameState))
            this.dispatch(setStartGameFlag(true))
        })
        this.socket?.on('new-game', (message) => {
            this.dispatch(pushGame(message.game))
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
        this.socket?.on('get-game-previews-page', (message) => {
            this.dispatch(pushGamesPage(message))
        })
        this.socket?.on('make-move', (message) => {
            this.dispatch(setDices(message.thrownDices.dices))
            setTimeout(() => {
                this.dispatch(updateGameField(message.leftGameField))
                this.dispatch(updateGameField(message.newGameField))
            }, 1000)
        })
        this.socket?.on('new-game-turn', (message) => {
            this.dispatch(setGameTurn(message.gameTurn))
        })
        this.socket?.on('buy-game-field', (message) => {
            this.dispatch(updateGameField(message.gameField))
            this.dispatch(updatePlayer(message.player))
        })
    }

    public startGame() {
        this.socket?.emit('start-game', {})
    }

    public getGameState() {
        this.socket?.emit('game-state', {})
    }

    public getGameChatMessagesPage(pageNumber?: number | null, pageSize?: number | null) {
        this.socket?.emit('game-chat-messages-page', { pageNumber, pageSize })
    }

    public sendGameChatMessage(messageText: string) {
        this.socket?.emit('send-game-chat-message', { messageText })
    }

    public getGamePreviewsPage(pageNumber?: number | null, pageSize?: number | null) {
        this.socket?.emit('get-game-previews-page', { pageNumber, pageSize })
    }

    public makeMove() {
        this.socket?.emit('make-move', {})
    }

    public buyGameField() {
        this.socket?.emit('buy-game-field', {})
    }
}