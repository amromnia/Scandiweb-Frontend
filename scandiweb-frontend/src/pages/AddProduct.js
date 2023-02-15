import { Component } from "react";
import React from 'react'
import { Navigate } from "react-router-dom";
import { api } from "../configs";

import "../css/ProductList.scss";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Book 5 - The Last Book",
            sku: "BCK-0005",
            price: 20,
            type: "Book",
            attributes: {
                "weight": 100
            },
            navigate: <></>,
        }
    }
    state = {  }

    clearState = () => {
        this.setState({
        });
    }

    navigateFunc = (path) => {
        this.setState({ navigate: <Navigate to={path} /> })
    }

    componentDidMount() {
    }

    onSaveBtnClick = async () => {
        const response = await fetch(api + "add-product.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                sku: this.state.sku,
                price: this.state.price,
                attributes: this.state.attributes
            })
        })
        const data = await response.json();
        if(data.ErrorCode === -5){
            alert("Product with this SKU already exists");
            return;
        }

        this.navigateFunc("/");
    }
    onCancelBtnClick = () => {
        this.navigateFunc("/");
    }

    render() {
        return (
            <div>
                {this.state.navigate}
                <div className='TopBar'>
                    <span className='Title'><h1>Product Add</h1></span>
                    <span className='Buttons'><button className='SaveBtn' onClick={this.onSaveBtnClick}>Save</button> <button className='CancelBtn' onClick={this.onCancelBtnClick}>Cancel</button></span>
                </div>
                <hr style={{marginBottom: "30px"}}/>
            </div>
         );
    }
}

export default AddProduct;