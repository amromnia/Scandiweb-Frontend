//simple product card component to display product info
import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


class ProductCard extends Component {
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

    componentDidMount() {
    }
    render() {
        const product = this.props.product;
        const eachProductAttributes = {"Book": ["weight"], "DVD": ["size"], "Furniture": ["length", "width", "height"]}
        const productAttributes = eachProductAttributes[product.type];
        var productAttributeValues = null
        var counter = 0;
        if(productAttributes.length > 1) {
            productAttributeValues = <Typography >Dimensions: {productAttributes.map((attribute, index) => {
                if(counter < productAttributes.length - 1) {
                    counter++;
                    return (
                        product[attribute] + " x "
                    )
                }
                else {
                    return (
                        product[attribute]
                    )
                }
            })}
            </Typography>
        }
        else {
            productAttributeValues = <Typography>
                {productAttributes[0].charAt(0).toUpperCase()+productAttributes[0].slice(1)}: {product[productAttributes[0]]+ (productAttributes[0] === "weight" ? " g" : " MB") + ""}
            </Typography>
        }
        return (
            //simple product card component to display product info, it will be used inside a grid
            <Card className="card" sx={{minWidth: 275}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {this.props.product.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {this.props.product.sku}
                    </Typography>
                    <Typography variant="body2">
                        {this.props.product.price.toFixed(2) + " $"}
                    </Typography>
                    {productAttributeValues}
                </CardContent>
                <CardActions>
                    <input type="checkbox" className='delete-checkbox' value={this.props.product.sku} onClick={this.props.onCheckboxClick} />
                </CardActions>
            </Card>
         );
    }
}
export default ProductCard;