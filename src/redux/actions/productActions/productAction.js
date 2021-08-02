import * as types from "./types"
import axios from "axios"
import { API_PRODUCT } from "../../../helpers/apis";

export const getProducts = () => {
    return async(dispatch) => {
        let response = await axios.get(API_PRODUCT);
        dispatch({
            type:types.GET_ALL_PRODUCT,
            payload:response.data
        });
    };
};

export const deleteProduct = (id) => {
    return async(dispatch) => {
        let response = await axios.delete(`${API_PRODUCT}/${id}`);
        dispatch({
            type:types.DELETE_PRODUCT,
            payload:response.data
        });
    }
}