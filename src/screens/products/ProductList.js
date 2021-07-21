import React from 'react'
import ProductCard from '../../components/products/ProductCard';

const ProductList = (props) => {
    const productsList = props.productsList;
    if(productsList){
        const productListView = productsList.map((product) => {
            return (
                <ProductCard product={product}/>
            );
        });
        return (
            <div className="ui celled list">
                {productListView}
            </div>
        );
    }
    
    
}
export default ProductList;