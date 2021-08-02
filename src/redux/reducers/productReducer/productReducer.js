import * as types from "../../actions/productActions/types"; 
const initialState = [];
const productReducer = (state = initialState,{type,payload}) => {

    switch(type){
        case types.SAVE_PRODUCT:

        case types.GET_PRODUCT:

        case types.UPDATE_PRODUCT:

        case types.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id != payload.id),
            }

        case types.GET_ALL_PRODUCT:
            return {
                ...state,
                products:[...payload]
            }
        default:
            return state;
    }
}

export default productReducer;