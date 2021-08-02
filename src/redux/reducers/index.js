import { combineReducers } from "redux";
import productReducer from "./productReducer/productReducer";

const rootReducers = combineReducers({
    products:productReducer    
});

export default rootReducers;