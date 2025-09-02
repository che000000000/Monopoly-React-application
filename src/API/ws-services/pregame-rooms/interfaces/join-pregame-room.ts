import { IPregameRoom } from "../../../../store/slices/pregame-rooms/interfaces/pregame-room";
import { IPregameRoomMember } from "../../../../store/slices/pregame-rooms/interfaces/pregame-room-member";

export interface IJoinPregameRoom {
    pregameRoom: IPregameRoom,
    joinedMember: IPregameRoomMember
}