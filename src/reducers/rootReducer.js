import { combineReducers } from 'redux'
import { MODIFY_ROOMINFO, NEXT_IMG } from 'actions/restActions'
import { SELECT_CITY, INVALIDATE_WEATHER, REQUEST_WEATHER, RECEIVE_WEATHER } from 'actions/weatherActions'

function roomsInfo(state = [{}, {}], action) {
    switch (action.type) {
        case MODIFY_ROOMINFO:
            return state.map((room, index) => {
                if (index === action.index) {
                    return Object.assign({}, room, {
                        roomType: action.roomType,
                        price: action.price
                    })
                }
                return room
            })
        default:
            return state
    }
}

function imgsInfo(state = {
    imgLength: 3,
    currentImg: 0
}, action) {
    switch (action.type) {
        case NEXT_IMG:
            const curN = state.currentImg
            return Object.assign({}, state, {
                currentImg: (curN === state.imgLength - 1) ? 0 : curN + 1 
            })
        default:
            return state
    }
}

function selectedCity(state = 'hangzhou', action) {
    switch (action.type) {
        case SELECT_CITY:
            return action.city
        default:
            return state
    }
}

function cityInfo(state = {
    didInvalidate: false,
    now: {},
    receivedAt: ''
}, action) {
    switch (action.type) {
        case INVALIDATE_WEATHER:
            return Object.assign({}, state, {
                didInvalidate: action.didInvalidate
            })
        case REQUEST_WEATHER:
            return Object.assign({}, state, {
                status: action.status,
                didInvalidate: action.didInvalidate
            })
        case RECEIVE_WEATHER:
            return Object.assign({}, state, {
                status: action.status,
                now: action.now,
                city: action.city,
                dailyTmp: action.dailyTmp,
                suggestion: action.suggestion,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    roomsInfo,
    imgsInfo,
    selectedCity,
    cityInfo
})

export default rootReducer
