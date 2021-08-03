import * as types from "./types";
import axios from "axios";
import { API_PRODUCT } from "../../../helpers/apis";

export const getProducts = () => {
  return async (dispatch) => {
    let response = await axios.get(API_PRODUCT);
    dispatch({
      type: types.GET_ALL_PRODUCT,
      payload: response.data,
    });
  };
};

export const updateProduct = (data) => {
  let form = new FormData();
  form.append("title", data.productName);
  form.append("price", data.price);
  form.append("description", "lorem ipsum set");
  form.append("image", data.image);
  form.append("category", "electronic");
  let id = data.id;
  return async (dispatch) => {
    let response = axios({
      url: `${API_PRODUCT}/${id}`,
      method: "PUT",
      data,
    });
    dispatch({
      type: types.UPDATE_PRODUCT,
      payload: { response },
    });
    return response.data;
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    let response = await axios.delete(`${API_PRODUCT}/${id}`);
    dispatch({
      type: types.DELETE_PRODUCT,
      payload: response.data,
    });
    return response.data;
  };
};
