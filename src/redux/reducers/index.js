import { combineReducers } from "redux";
import productReducer from "./productReducer/productReducer";

const rootReducers = combineReducers({
  productReducer,
});

export default rootReducers;
