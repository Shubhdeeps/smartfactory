import { ActionTypes } from "../constants/action-types"

export const setNavItem = (item) => {
    return{
        type: ActionTypes.SET_NAV_ITEM,
        payload: item
    }
}

