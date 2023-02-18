import { Component } from "react";
import React from 'react'
import { Navigate } from "react-router-dom";
import { api } from "../configs";

import "../css/ProductList.scss";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            sku: "",
            price: "",
            type: "Book",
            attributes: {
                weight: "",
                height: "",
                width: "",
                length: "",
                size: ""
            },
            navigate: <></>,
        }
    }
    state = {  }

    clearState = () => {
        this.setState({
            name: "",
            sku: "",
            price: "",
            type: "Book",
            attributes: {
                weight: "",
                height: "",
                width: "",
                length: "",
                size: ""
            }
        });
    }

    navigateFunc = (path) => {
        this.setState({ navigate: <Navigate to={path} /> })
    }

    componentDidMount() {
    }

    getImportantAttributeObject = () => {
        const allTypes = {
            "Book": {
                weight: this.state.attributes.weight
            },
            "DVD": {
                size: this.state.attributes.size
            },
            "Furniture": {
                height: this.state.attributes.height,
                width: this.state.attributes.width,
                length: this.state.attributes.length
            }
        }
        return allTypes[this.state.type];
    }

    onSaveBtnClick = async () => {
        if(this.state.name === "" || this.state.sku === "" || this.state.price === "") {
            alert("Please fill all the fields");
            return;
        }
        const importantAttributes = this.getImportantAttributeObject();
        if(Object.values(importantAttributes).some((value) => value === "")) {
            alert("Please fill all the fields");
            return;
        }
        const response = await fetch(api + "add-product.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                sku: this.state.sku,
                price: this.state.price,
                attributes: importantAttributes,
            })
        })
        const data = await response.json();
        console.log(data.ErrorCode)
        if(data.ErrorCode === -5){
            alert("Product with this SKU already exists");
            return;
        }

        this.navigateFunc("/");
    }
    onCancelBtnClick = () => {
        this.navigateFunc("/");
    }

    getHTMLAttributesOfSelectedType = () => {
        const allTypes = {
            "Book":
                <div className='ProductFormRow'>
                    <div className='ProductFormLabel'>Weight (G)</div>
                    <div className='ProductFormInput'><input id="weight" type='text' value={this.state.attributes.weight} onChange={(e) => {
                        const re =/^\d*(\.)?(\d{0,5})?$/
                        if (e.target.value === '' || re.test(e.target.value.toString()))
                        {
                            this.setState({ attributes: {...this.state.attributes, weight: e.target.value } })
                        }
                    }} /></div>
                    <div className='ProductFormDescription'>"Book: a written or printed work consisting of pages glued or sewn together along one side and bound in covers. please input its weight." </div>
                </div>
            ,
            "DVD":
                <div className='ProductFormRow'>
                    <div className='ProductFormLabel'>Size (MB)</div>
                    <div className='ProductFormInput'><input id="size" type='text' value={this.state.attributes.size} onChange={(e) => {const re =/^\d*(\.)?(\d{0,5})?$/
                        if (e.target.value === '' || re.test(e.target.value.toString()))
                        {
                            this.setState({ attributes: {...this.state.attributes, size: e.target.value } })
                        }
                        }} /></div>
                    <div className='ProductFormDescription'>"DVD: A digital disc that can store any kind of digital data and has been widely used for video programs or formerly for storing software and other computer files as well. please input its size." </div>
                </div>
            ,
            "Furniture":
                <div className='ProductFormRow'>
                    <div className='ProductFormLabel'>Height (CM)</div>
                    <div className='ProductFormInput'><input id="height" type='text' value={this.state.attributes.height} onChange={(e) => {const re =/^\d*(\.)?(\d{0,5})?$/
                        if (e.target.value === '' || re.test(e.target.value.toString()))
                        {
                            this.setState({ attributes: {...this.state.attributes, height: e.target.value } })
                        }
                        }} /></div>
                    <div className='ProductFormLabel'>Width (CM)</div>
                    <div className='ProductFormInput'><input id="width" type='text' value={this.state.attributes.width} onChange={(e) => {
                        const re =/^\d*(\.)?(\d{0,5})?$/
                        if (e.target.value === '' || re.test(e.target.value.toString()))
                        {
                            this.setState({ attributes: {...this.state.attributes, width: e.target.value } })
                        }
                    }} /></div>
                    <div className='ProductFormLabel'>Length (CM)</div>
                    <div className='ProductFormInput'><input id="length" type='text' value={this.state.attributes.length} onChange={(e) => {
                        const re =/^\d*(\.)?(\d{0,5})?$/
                        if (e.target.value === '' || re.test(e.target.value.toString()))
                        {
                            this.setState({ attributes: {...this.state.attributes, length: e.target.value } })
                        }
                    }} /></div>
                    <div className='ProductFormDescription'>"Furniture: movable objects intended to support various human activities such as seating, eating, storing items, eating and/or working with an item, and sleeping. please input its dimensions (height, width, length)" </div>
                </div>
        }
        return allTypes[this.state.type];
    }
    clearTypeAttributes = () => {
        const emptyAttributes = {
            weight: "",
            height: "",
            width: "",
            length: "",
            size: ""
        }
        this.setState({
            attributes: emptyAttributes
        })
    }
    render() {
        return (
            <div>
                {this.state.navigate}
                <div className='TopBar'>
                    <span className='Title'><h1>Product Add</h1></span>
                    <span className='Buttons'><button className='SaveBtn' onClick={this.onSaveBtnClick}>Save</button> <button className='CancelBtn' onClick={this.onCancelBtnClick}>Cancel</button></span>
                </div>
                <br style={{marginBottom: "30px"}}/>
                <div id="product_form" className='ProductForm'>
                    <div className='ProductFormRow'>
                        <div className='ProductFormLabel'>Name</div>
                        <div className='ProductFormInput'><input id="name" type='text' value={this.state.name} onChange={(e) => {
                            const re =/^[a-zA-Z0-9 ,._:-]{0,80}$/
                            if(re.test(e.target.value.toString()) || e.target.value === ''){
                                this.setState({ name: e.target.value.toString()})
                            }
                        }} /></div>
                        <div className='ProductFormLabel'>SKU (8 Characters Max)</div>
                        <div className='ProductFormInput'><input id="sku" type='text' value={this.state.sku} onChange={(e) => {
                            const re =/^[a-zA-Z0-9]{0,8}$/
                            if(re.test(e.target.value.toString()) || e.target.value === ''){
                                this.setState({ sku: e.target.value.toString()})
                            }
                        }} /></div>
                        <div className='ProductFormLabel'>Price</div>
                        <div className='ProductFormInput'><input id="price" type='text' value={this.state.price} onChange={(e) => {
                            const re =/^\d*(\.)?(\d{0,5})?$/
                            if (e.target.value === '' || re.test(e.target.value.toString()))
                            {
                                this.setState({ price: e.target.value })
                            }
                        }} /></div>
                        <div className='ProductFormLabel'>Type</div>
                        <div className='ProductFormInput'>
                            <select id="productType" onChange={(e)=>{
                                this.clearTypeAttributes()
                                this.setState({type: e.target.value})
                            }} value={this.state.type}>
                                <option value="Book">Book</option>
                                <option value="DVD">DVD</option>
                                <option value="Furniture">Furniture</option>
                            </select>
                        </div>
                    {this.getHTMLAttributesOfSelectedType()}
                    </div>
                </div>
            </div>
         );
    }
}

export default AddProduct;