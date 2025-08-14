import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearPregameRooms, pushPregameRoom, pushPregameRooms, removePregameRoom, setIsPregameGatewayConnected, updatePregameRoomMembers } from "../../store/pregame-rooms-slice";
import { io, Socket } from "socket.io-client";

export const connectPregameGateway = createAsyncThunk(
    'pregame-rooms/gateway-connection',
    async (_, { dispatch }) => {
        const socket: Socket = io(`http://localhost:7507/pregame`, {
            withCredentials: true,
        })

        socket.on('connect', () => {
            dispatch(clearPregameRooms(null))

            dispatch(setIsPregameGatewayConnected(true))
            
            socket.emit('pregame-rooms-page', {})
        })

        socket.on('disconnect', () => {
            dispatch(setIsPregameGatewayConnected(false))
        })

        socket.on('pregame', (data) => {
            switch (data.event) {
                case ('create'): {
                    dispatch(pushPregameRoom(data.newPregameRoom))
                    break
                }
                case ('rooms-page'): {
                    dispatch(pushPregameRooms(data.pregameRoomsList))
                    break
                }
                case ('create-pregame-room'): {
                    dispatch(pushPregameRoom(data.pregameRoom))
                    break
                }
                case ('join-pregame-room'): {
                    dispatch(updatePregameRoomMembers(data.pregameRoom))
                    break
                }
                case ('leave-pregame-room'): {
                    dispatch(updatePregameRoomMembers(data.pregameRoom))
                    break
                }
                case('remove-pregame-room'): {
                    dispatch(removePregameRoom(data.pregameRoom.id))
                    break
                }
                default: {
                    break
                }
            }
        })
    }
)