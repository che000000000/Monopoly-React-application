import { io, Socket } from "socket.io-client"
import { AppDispatch } from "../../../store"
import { pushGame, pushGameChatMessage, pushGameChatMessagesPage, pushGamePreviewsPage, setCurrentGame, setDices, setGameTurn, setIsGatewayConnected, setStartGameFlag, updateGameField, updatePlayer } from "../../../store/slices/games/games-slice"
import { IGameField } from "../../../store/interfaces/game-field"
import { IPlayer } from "../../../store/interfaces/player"
import { IGameTurn } from "../../../store/interfaces/game-turn"
import { MakeMoveMessage } from "./interfaces/make-move"
import { GamePrewiewsPageMessage } from "./interfaces/game-previews-page"
import { IGameChatMessage } from "../../../store/interfaces/game-chat-message"
import { GameChatMessagesPageMessage } from "./interfaces/game-chat-messages-page"
import { IGameState } from "../../../store/interfaces/game-state"
import { IGamePreview } from "../../../store/interfaces/game-preview"
import { ThrowDicesMessage } from "./interfaces/throw-dices"

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
        this.socket?.on('start-game', (message: IGameState) => {
            this.dispatch(setCurrentGame(message))
            this.dispatch(setStartGameFlag(true))
        })
        this.socket?.on('new-game', (message: IGamePreview) => {
            this.dispatch(pushGame(message))
        })
        this.socket?.on('game-state', (message: IGameState) => {
            this.dispatch(setCurrentGame(message))
        })
        this.socket?.on('game-chat-messages-page', (message: GameChatMessagesPageMessage) => {
            this.dispatch(pushGameChatMessagesPage(message))
        })
        this.socket?.on('game-chat-message', (message: IGameChatMessage) => {
            this.dispatch(pushGameChatMessage(message))
        })
        this.socket?.on('game-previews-page', (message: GamePrewiewsPageMessage) => {
            this.dispatch(pushGamePreviewsPage(message))
        })
        this.socket?.on('throw-dices', (message: ThrowDicesMessage) => {
            this.dispatch(setDices(message.dices))
        })
        this.socket?.on('make-move', (message: MakeMoveMessage) => {
            message.gameFields.map(gf => this.dispatch(updateGameField(gf)))
            this.dispatch(updatePlayer(message.player))
        })
        this.socket?.on('set-game-turn', (message: IGameTurn) => {
            this.dispatch(setGameTurn(message))
        })
        this.socket?.on('update-players', (message: IPlayer[]) => {
            message.map(p => this.dispatch(updatePlayer(p)))
        })
        this.socket?.on('update-game-fields', (message: IGameField[]) => {
            message.map(gf => this.dispatch(updateGameField(gf)))
        })
    }

    public startGame() {
        this.socket?.emit('start-game')
    }

    public getGameState() {
        this.socket?.emit('game-state')
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
        this.socket?.emit('make-move')
    }

    public acceptPayment(paymentId: string) {
        this.socket?.emit('accept-payment', { paymentId })
    }
}