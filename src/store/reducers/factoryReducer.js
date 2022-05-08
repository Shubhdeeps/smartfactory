import { ActionTypes } from "../constants/action-types"

const initialState = {
    factories: [],
    single_factory: {}
}

export const factories = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.INIT_FACTORIES:
            return {...state, factories: action.payload}
        case ActionTypes.SET_FACTORY:
            return {...state, factories: [action.payload, ...state.factories]}
        case ActionTypes.SET_SELECTED_FACTORY:
            return {...state, single_factory: action.payload}
        case ActionTypes.UPDATE_FACTORY:
            const newFactory = state.factories.filter(fac => {
                return(fac.id !== action.payload.id)
            })
            return {...state, factories: [action.payload, ...newFactory]}
        default:
            return state
    }
}


