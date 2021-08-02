import { product } from 'prelude-ls';
import React from 'react'

const ProductCard = (props) => {
    const {id,title,price,description,image,category} = props.product;
    return (
        <div className="item">
            <div>
                <div className="content">
                    <div className="header">
                        {title}
                    </div>
                    <div>
                        <img src={image} style={{height:70,width:70}}/>
                    </div>
                    <div>
                        <b>Rs. {price}</b>
                    </div>
                    <div>
                        <b>Specifications : </b>{description}
                    </div>
                    <div>
                        <b>Category : </b>{category}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;