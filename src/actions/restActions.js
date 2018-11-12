export const MODIFY_ROOMINFO = 'MODIFY_ROOMINFO';
export const NEXT_IMG = 'NEXT_IMG';

export function modifyRoomInfo(index, price) {
  return {
    type: 'MODIFY_ROOMINFO',
    index,
    price
  };
}
