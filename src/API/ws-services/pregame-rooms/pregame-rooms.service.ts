import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../../../store";
import { pushCurrentPregameRoomMessage, pushCurrentPregameRoomMessagesPage, pushPregameRoom, pushPregameRoomsPage, removePregameRoom, setIsGatewayConnected, setPregameRoomMembers } from "../../../store/slices/pregame-rooms/pregame-rooms-slice";
import { PlayerChip } from "../../../store/enums/player-chip";
import { IPregameRoomsPage } from "./interfaces/pregame-rooms-page";
import { ICreatePregameRoom } from "./interfaces/create-pregame-room";
import { IJoinPregameRoom } from "./interfaces/join-pregame-room";
import { ILeavePregameRoom } from "./interfaces/leave-pregame-room";
import { IRemovePregameRoom } from "./interfaces/remove-pregame-room";
import { ISetPregameRoomMemberSlot } from "./interfaces/set-pregame-room-member-slot";
import { IPregameRoomMessagesPage } from "./interfaces/pregame-room-messages-page";
import { ISendPregameRoomMessage } from "./interfaces/send-pregame-room-message";
import { ISetPregameRoomMemberPlayerChip } from "./interfaces/set-pregame-room-member-player-chip";

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
    }

    private setupListeners() {
        this.socket?.on('connect', () => {
            this.dispatch(setIsGatewayConnected(true))
        })

        this.socket?.on('disconnect', () => {
            this.dispatch(setIsGatewayConnected(false))
        })

        this.socket?.on('pregame-rooms-page', (message: IPregameRoomsPage) => {
            this.dispatch(pushPregameRoomsPage({pregameRoomsList: message.pregameRoomsList, totalCount: message.totalCount}))
        })

        this.socket?.on('create-pregame-room', (message: ICreatePregameRoom) => {
            this.dispatch(pushPregameRoom(message.pregameRoom))
        })

        this.socket?.on('join-pregame-room', (message: IJoinPregameRoom) => {
            this.dispatch(setPregameRoomMembers(message.pregameRoom))
        })

        this.socket?.on('leave-pregame-room', (message: ILeavePregameRoom) => {
            this.dispatch(setPregameRoomMembers(message.pregameRoom))
        })

        this.socket?.on('remove-pregame-room', (message: IRemovePregameRoom) => {
            this.dispatch(removePregameRoom(message.pregameRoom.id))
        })

        this.socket?.on('set-pregame-room-member-slot', (message: ISetPregameRoomMemberSlot) => {
            this.dispatch(setPregameRoomMembers(message.pregameRoom))
        })

        this.socket?.on('pregame-room-messages-page', (message: IPregameRoomMessagesPage) => {
            this.dispatch(pushCurrentPregameRoomMessagesPage(message))
        })

        this.socket?.on('send-pregame-room-message', (message: ISendPregameRoomMessage) => {
            this.dispatch(pushCurrentPregameRoomMessage(message.message))
        })

        this.socket?.on('set-pregame-room-player-chip', (message: ISetPregameRoomMemberPlayerChip) => {
            this.dispatch(setPregameRoomMembers(message.pregameRoom))
        })
    }

    public getPregameRoomsPage(pageNumber?: number, pageSize?: number) {
        this.socket?.emit('pregame-rooms-page', {pageNumber, pageSize})
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

    public setPregameRoomMemberPlayerChip(playerChip: PlayerChip) {
        this.socket?.emit('set-pregame-room-player-chip', { playerChip })
    }
}