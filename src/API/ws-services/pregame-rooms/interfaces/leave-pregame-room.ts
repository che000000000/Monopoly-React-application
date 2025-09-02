import { IPregameRoom } from "../../../../store/slices/pregame-rooms/interfaces/pregame-room";
import { IPregameRoomMember } from "../../../../store/slices/pregame-rooms/interfaces/pregame-room-member";

export interface ILeavePregameRoom {
    pregameRoom: IPregameRoom,
    leftMember: IPregameRoomMember
}