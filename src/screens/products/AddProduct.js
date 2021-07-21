import React, { useState } from 'react'

const AddProduct = (props) => {
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productDesc, setProductDesc] = useState();
    const addProductHandler = props.addProductHandler;
    const saveProduct = (e) => {
        e.preventDefault();
        if(productName==="" || productPrice===""|| productDesc==="")
        {
            alert("All the fields are required.")
            return;
        }
        const product = {
            name:productName,
            price:productPrice,
            desc:productDesc
        };
        setProductName("")
        setProductPrice("")
        setProductDesc("")
        addProductHandler(product);
    };
    return (
        <div className="ui main">
            <h2>Product Form</h2>
            <form className="ui form" onSubmit={saveProduct}>
            <div className="field">
                <label>Product Name</label>
                <input type="text" name="product_name" placeholder="Enter product name" onChange={(e) => setProductName(e.target.value)} value={productName}/>
            </div>
            <div className="field">
                <label>Product Price</label>
                <input type="text" name="product_price" placeholder="Enter product price" onChange={(e) => setProductPrice(e.target.value)} value={productPrice}/>
            </div>
            <div className="field">
                <label>Product Description</label>
                <input type="text" name="product_desc" placeholder="Enter product description" onChange={(e) => setProductDesc(e.target.value)} value={productDesc}/>
            </div>
            <div className="field">
                <label>Product Photo</label>
                <input type="file" name="product_photo"/>
            </div>
                <button className="ui button blue">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;