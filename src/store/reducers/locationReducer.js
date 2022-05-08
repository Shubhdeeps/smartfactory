import { ActionTypes } from "../constants/action-types"

const initialState = {
    locations: [],
    single_location: {}
}

export const locations = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.INIT_LOCATIONS:
            return {...state, locations: action.payload}
        case ActionTypes.SET_LOCATION:
            return {...state, locations: [action.payload, ...state.locations]}
        case ActionTypes.SET_SELECTED_LOCATION:
            return {...state, single_location: action.payload}
        case ActionTypes.UPDATE_LOCATION:
            const newLocations = state.locations.filter(loc => {
                return(loc.id !== action.payload.id)
            })
            return {...state, locations: [action.payload, ...newLocations]}
        default:
            return state
    }
}


