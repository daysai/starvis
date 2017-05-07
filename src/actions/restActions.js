export const MODIFY_ROOMINFO = 'MODIFY_ROOMINFO'
export const NEXT_IMG = 'NEXT_IMG'

export function modifyRoomInfo(index, roomType, price) {
	return {
		type: 'MODIFY_ROOMINFO',
		index,
		roomType,
		price
	}	
}

export function nextImg() {
	return {
		type: 'NEXT_IMG'
	}
}