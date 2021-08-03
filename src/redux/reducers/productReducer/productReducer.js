import * as types from "../../actions/productActions/types";
const initialState = {
  products: [],
  product: null,
};
const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_PRODUCT:
      return {
        ...state,
        products: [...payload],
      };
    case types.SAVE_PRODUCT:

    case types.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id == payload.id ? payload : item
        ),
      };

    case types.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id != payload.id),
      };

    default:
      return state;
  }
};

export default productReducer;
