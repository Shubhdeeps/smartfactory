import { combineReducers } from "redux";
import { navbar } from "./navReducer";
import { locations } from "./locationReducer";
import { factories } from "./factoryReducer";
import { dataActions, selectedElements } from "./dataActionReducer";

export default combineReducers({
    navbar,
    locations,
    factories,
    dataActions,
    selectedElements
})