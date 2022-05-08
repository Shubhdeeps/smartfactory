import { ActionTypes } from "../constants/action-types"

export const setLocationLoading = (toggle) => {
    return{
        type: ActionTypes.LOADING_LOCATION_DATA,
        payload: toggle
    }
}

export const setFactoryLoading = (toggle) => {
    return{
        type: ActionTypes.LOADING_FACTORY_DATA,
        payload: toggle
    }
}

export const setFactoryErrorMessage = (message) => {
    return{
        type: ActionTypes.FACTORY_ERROR,
        payload: message
    }
}

export const setLocationErrorMessage = (message) => {
    return{
        type: ActionTypes.LOCATION_ERROR,
        payload: message
    }
}

export const setManager = (item) => {
    return{
        type: ActionTypes.SELECT_MANAGER,
        payload: item
    }
} 

export const setRecentActivity = (item) => {
    return{
        type: ActionTypes.HISTORY_ELEMENT,
        payload: item
    }
}