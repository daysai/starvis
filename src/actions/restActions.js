export const MODIFY_ROOMINFO = 'MODIFY_ROOMINFO';

export function modifyRoomInfo(index, roomType, price, vip) {
  return {
    type: 'MODIFY_ROOMINFO',
    index,
    roomType,
    price,
    vip
  };
}
