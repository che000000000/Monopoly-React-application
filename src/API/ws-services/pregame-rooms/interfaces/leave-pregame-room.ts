import { PregameRoomT } from "../../../../store/pregame-rooms/types/pregame-room";
import { PregameRoomMemberT } from "../../../../store/pregame-rooms/types/pregame-room-member";

export interface ILeavePregameRoom {
    pregameRoom: PregameRoomT,
    leftMember: PregameRoomMemberT
}