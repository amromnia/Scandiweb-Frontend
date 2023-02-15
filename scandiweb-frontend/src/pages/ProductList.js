import { Component } from "react";
import React from 'react'
import { Navigate } from "react-router-dom";
import { api } from "../configs";
import Card from '@mui/material/Card';
import ProductCard from "../components/ProductCard";

import "../css/ProductList.scss";
import { Grid } from "@mui/material";


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            navigate: <></>,
            error: null,
            productsToDelete: []
        }
    }
    state = {  }

    clearState = () => {
        this.setState({
            products: []
        });
    }

    loadProducts = async () => {
    try{
        const response  = await fetch(api + "get-products.php");
        if(!response.ok){
            this.setState({ error: "Error: " + response.statusText })
            return;
        }
        const data = await response.json();
        if(data.error){
            this.setState({ error: "Error: " + data.error})
            return;
        }
        this.setState({ products: data });
        console.log(data)
    }
    catch(error) {
        this.setState({ error: error.message })
    }
    }

    componentDidMount() {
        this.loadProducts();
    }

    navigateFunc = (path) => {
        this.setState({ navigate: <Navigate to={path} /> })
    }
    onAddBtnClick = () => {
        this.navigateFunc("/add-product")
    }

    onClick2 = () => {
        console.log(this.state.productsToDelete)
    }
    onCheckboxClick = (e) => {
        if(e.target.checked === false){
            this.setState({ productsToDelete: this.state.productsToDelete.filter((sku) => sku !== e.target.value) })
            return;
        }
        this.setState({ productsToDelete: [...this.state.productsToDelete, e.target.value] })
    }

    onDeleteBtnClick = async () => {
        if(this.state.productsToDelete.length === 0){
            return;
        }
        try{
            const response  = await fetch(api + "delete-products.php", {
                method: 'DELETE',
                body: JSON.stringify({
                    products: this.state.productsToDelete
                })
            });
            if(!response.ok){
                this.setState({ error: "Error: " + response.statusText })
                return;
            }
            const data = await response.json();
            if(data.error){
                this.setState({ error: "Error: " + data.error})
                return;
            }
        }
        catch(error) {
            this.setState({ error: error.message })
            return;
        }
        this.navigateFunc(0)
    }
    loadProductCards = () => {
        //grid of product cards
        return <Grid container columnGap={5}
            rowGap={5}
            direction="row"
            justifyContent="flex-start"
        >
        {this.state.products.map((product) => {
            return (
                <ProductCard product={product} onCheckboxClick={this.onCheckboxClick} key={product.sku}>
                </ProductCard>
            )
        })}
        </Grid>
    }
    render() {
        return (
            <div>
                {this.state.navigate}
                <div className='TopBar'>
                    <span className='Title'><h1>Product List</h1></span>
                    <span className='Buttons'><button className='AddBtn' onClick={this.onAddBtnClick}>Add</button> <button className='DeleteBtn' onClick={this.onDeleteBtnClick}>Mass Delete</button></span>
                </div>
                <hr style={{marginBottom: "30px"}}/>
                <div className='Error'>{this.state.error}</div>
                <div className='ProductList'>
                    {this.loadProductCards()}
                </div>
            </div>
         );
    }
}
export default ProductList;