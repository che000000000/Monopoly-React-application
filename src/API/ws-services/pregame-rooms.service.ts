import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../../store";
import { clearCurrentPregameRoomMessages, clearPregameRooms, pushCurrentPregameRoomMessage, pushCurrentPregameRoomMessages, pushPregameRoom, pushPregameRooms, removePregameRoom, setIsPregameGatewayConnected, setPregameRoomMembers } from "../../store/pregame-rooms-slice";

export class PregameRoomsGatewayService {
    private socket: Socket | null = null
    private dispatch

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch
    }

    connect() {
        this.socket = io('http://localhost:7507/pregame-rooms', {
            withCredentials: true
        })

        this.setupListeners()
    }

    disconnect() {
        this.socket?.disconnect()
        this.socket = null

        this.dispatch(setIsPregameGatewayConnected(false))
        this.dispatch(clearPregameRooms(null))
    }

    private setupListeners() {
        this.socket?.on('connect', () => {
            this.dispatch(clearPregameRooms(null))
            this.dispatch(setIsPregameGatewayConnected(true))

            this.socket?.emit('pregame-rooms-page', {})
        })

        this.socket?.on('disconnect', () => {
            this.dispatch(setIsPregameGatewayConnected(false))
            this.dispatch(clearPregameRooms(null))
        })

        this.socket?.on('pregame-rooms-page', (message) => {
            this.dispatch(pushPregameRooms(message.pregameRoomsList))
        })

        this.socket?.on('create-pregame-room', (message) => {
            this.dispatch(pushPregameRoom(message.pregameRoom))
        })

        this.socket?.on('join-pregame-room', (message) => {
            this.dispatch(setPregameRoomMembers(message))
        })

        this.socket?.on('leave-pregame-room', (message) => {
            this.dispatch(setPregameRoomMembers(message))
        })

        this.socket?.on('remove-pregame-room', (message) => {
            this.dispatch(removePregameRoom(message.pregameRoom.id))
        })

        this.socket?.on('set-pregame-room-member-slot', (message) => {
            this.dispatch(setPregameRoomMembers(message))
        })

        this.socket?.on('pregame-room-messages-page', (message) => {
            this.dispatch(pushCurrentPregameRoomMessages(message))
        })

        this.socket?.on('send-pregame-room-message', (message) => {
            this.dispatch(pushCurrentPregameRoomMessage(message))
        })
    }

    public joinPregameRoom(pregameRoomId: string, slot: number) {
        this.socket?.emit('join-pregame-room', { pregameRoomId, slot })
    }

    public leavePregameRoom() {
        this.socket?.emit('leave-pregame-room', {})
    }

    public createPregameRoom() {
        this.socket?.emit('create-pregame-room', {})
    }

    public setPregameRoomMemberSlot(slot: number) {
        this.socket?.emit('set-pregame-room-member-slot', { slot })
    }

    public getPregameRoomMessagesPage(pageNumber: number, pageSize: number) {
        this.socket?.emit('pregame-room-messages-page', { pageNumber, pageSize })
    }

    public sendPregameRoomMessage(messageText: string) {
        this.socket?.emit('send-pregame-room-message', { messageText })
    }
}