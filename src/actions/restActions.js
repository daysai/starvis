export const MODIFY_ROOMINFO = 'MODIFY_ROOMINFO';

export function modifyRoomInfo(index, roomType, price) {
  return {
    type: 'MODIFY_ROOMINFO',
    index,
    roomType,
    price
  };
}
