import { ActionTypes } from "../constants/action-types"


export const setInitFactories = (items) => {
    return{
        type: ActionTypes.INIT_FACTORIES,
        payload: items
    }
}
export const setFactory = (item) => {
    return{
        type: ActionTypes.SET_FACTORY,
        payload: item
    }
}

export const setSelectedFactory = (item) =>{
    return{
        type: ActionTypes.SET_SELECTED_FACTORY,
        payload: item
    }
}

export const updateFactory = (item) => {
    return{
        type: ActionTypes.UPDATE_FACTORY,
        payload: item
    }
}