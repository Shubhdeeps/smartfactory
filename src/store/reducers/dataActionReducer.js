import { ActionTypes } from "../constants/action-types"

const initialState = {
    factoryError: '',
    locationError: '',
    factoryLoading: false,
    locationLoading: false,
    manager: true
}

export const dataActions = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.FACTORY_ERROR:
            return {...state, factoryError: action.payload}
        case ActionTypes.LOCATION_ERROR:
            return {...state, locationError: action.payload}
        case ActionTypes.LOADING_FACTORY_DATA:
            return {...state, factoryLoading: action.payload}
        case ActionTypes.LOADING_LOCATION_DATA:
            return {...state, locationLoading: action.payload}
        case ActionTypes.SELECT_MANAGER:
            return {...state, manager: action.payload}
        default:
            return state
    }
}

const recentInitailState = {
    recent: []
}

export const selectedElements = (state = recentInitailState, action) => {
    switch(action.type){
        case ActionTypes.HISTORY_ELEMENT:
            const newId = action.payload['id']
            const newArray = state.recent.filter(x => {
                return(x.id !== newId)
            })
            return {...state, recent: [action.payload, ...newArray ]}
        default:
            return state
    }
}

