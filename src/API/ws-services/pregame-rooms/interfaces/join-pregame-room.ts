import { PregameRoomT } from "../../../../store/pregame-rooms/types/pregame-room";
import { PregameRoomMemberT } from "../../../../store/pregame-rooms/types/pregame-room-member";

export interface IJoinPregameRoom {
    pregameRoom: PregameRoomT,
    joinedMember: PregameRoomMemberT
}