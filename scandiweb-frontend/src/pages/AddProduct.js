import { Component } from "react";
import React from 'react'
import { api } from "../configs";

import "../css/ProductList.scss";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    state = {  }

    clearState = () => {
        this.setState({
        });
    }

    render() {
        return (
            <div>Add Product</div>
         );
    }
}

export default AddProduct;