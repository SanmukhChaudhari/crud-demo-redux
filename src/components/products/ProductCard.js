import { product } from 'prelude-ls';
import React from 'react'

const ProductCard = (props) => {
    const {id,name,price,desc} = props.product;
    return (
        <div className="item">
            <div className="content">
                <div className="header">
                    {name}
                </div>
                <div>
                    Rs. {price}
                </div>
                <div>
                    Specifications : {desc}
                </div>
            </div>
        </div>
    );
}
export default ProductCard;