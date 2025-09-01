import { io, Socket } from "socket.io-client"
import { AppDispatch } from "../../../store"
import { setCurrentGame, setIsGatewayConnected } from "../../../store/games/games-slice"

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
            console.log(message)
            this.dispatch(setCurrentGame(message.gameState))
        })
    }

    public startGame() {
        this.socket?.emit('start-game', {})
    }

    public getGameState(gameId?: string) {
        console.log('2')
        this.socket?.emit('get-game-state', { gameId })
    }
}