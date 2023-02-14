import { Component } from "react";
import React from 'react'
import { api } from "../configs";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
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

    render() {
        return (
            <div>
                <h1>Index</h1>
                <h2>Loading from: {api}</h2>
                <ul>
                    {this.state.products.map((product, index) => {
                        const eachProductAttributes = {"Book": ["weight"], "DVD": ["size"], "Furniture": ["height", "width", "length"]}
                        const productAttributes = eachProductAttributes[product.type];
                        const productAttributeValues = productAttributes.map((attribute, index) => {
                            return (
                                <li key={index}>
                                    <p>{attribute}: {product[attribute]}</p>
                                </li>
                            )
                        });
                        return (
                            <li key={index}>
                                <h3>{product.sku}</h3>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.type}</p>
                                <ul>
                                    {productAttributeValues}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
         );
    }
}

export default Index;