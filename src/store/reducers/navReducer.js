import { ActionTypes } from "../constants/action-types"

const initialState = {
    item: "Dashboard"
}

export const navbar = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_NAV_ITEM:
            return {...state, item: action.payload}
        default:
            return state
    }
}