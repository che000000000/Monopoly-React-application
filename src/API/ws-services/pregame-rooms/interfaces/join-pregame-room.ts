import { IPregameRoom } from "../../../../store/pregame-rooms/interfaces/pregame-room";
import { IPregameRoomMember } from "../../../../store/pregame-rooms/interfaces/pregame-room-member";

export interface IJoinPregameRoom {
    pregameRoom: IPregameRoom,
    joinedMember: IPregameRoomMember
}