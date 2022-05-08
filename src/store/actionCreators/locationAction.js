import { ActionTypes } from "../constants/action-types"


export const setInitLocations = (items) => {
    return{
        type: ActionTypes.INIT_LOCATIONS,
        payload: items
    }
}

export const setLocation = (item) => {
    return{
        type: ActionTypes.SET_LOCATION,
        payload: item
    }
}

export const setSelectedLocation = (item) =>{
    return{
        type: ActionTypes.SET_SELECTED_LOCATION,
        payload: item
    }
}

export const updateLocation = (item) => {
    return{
        type: ActionTypes.UPDATE_LOCATION,
        payload: item
    }
}
