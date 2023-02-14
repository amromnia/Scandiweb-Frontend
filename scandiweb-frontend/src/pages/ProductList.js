import { Component } from "react";
import React from 'react'
import { Navigate } from "react-router-dom";
import { api } from "../configs";

import "../css/ProductList.scss";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            navigate: <></>
        }
    }
    state = {  }

    clearState = () => {
        this.setState({
            products: []
        });
    }

    loadProducts = async () => {
        const response  = await fetch(api + "get-products.php");
        if(!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        if(data.error) throw new Error(data.error);
        this.setState({ products: data });
        console.log(data)
    }

    componentDidMount() {
        this.loadProducts();
    }

    onAddBtnClick = () => {
        this.setState({ navigate: <Navigate to="/add-product" /> })
    }

    render() {
        return (
            <div>
                {this.state.navigate}
                <div className='TopBar'>
                    <span className='Title'><h1>Product List</h1></span>
                    <span className='Buttons'><button className='AddBtn' onClick={this.onAddBtnClick}>Add</button> <button className='DeleteBtn'>Mass Delete</button></span>
                </div>
                {/*add two buttons next to ProductList using css*/}


                <hr />

            </div>
         );
    }
}
export default ProductList;