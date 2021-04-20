import React, { Component } from 'react';

//Import components
import Products from './Products';
import Filter from './Filter';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import '../css/styles.css';
import SellerPageTemplate from './SellerPageTemplate';
import {useForm} from 'react-hook-form';

class SellerProduct extends Component {

  state = {
    file: null
  };


  addProduct = () => {
      const user = global.auth.getUser();
      const shopID = user['shopID'];
      var productName = document.getElementById('productName').value;
      var productDEscription = document.getElementById('productDescription').value;
      var price = document.getElementById('price').value;
      var quantity = document.getElementById('quantity').value;
      var image = document.getElementById('productImage').files[0];
      var image3D = document.getElementById('3DProductImage').files[0];
      var auction = 0;

      var r1 = new FileReader;
      r1.readAsBinaryString(image);
      var image_binary;
      r1.onload = function(e) {
        image_binary = btoa(r1.result);
        console.log(image_binary);
        var r2 = new FileReader;
        r2.readAsBinaryString(image3D);
        var image3D_binary;
        r2.onload = function(e) {
            image3D_binary = btoa(r2.result);
            axios.post(`/shops/${shopID}`, { 
                'productName': productName, 
                'productDescription': productDEscription, 
                'price': price, 
                'quantity': quantity, 
                'productImage': image_binary, 
                'product3DImage': image3D_binary, 
                'isAuctionItem': auction 
              })
            .then((res) => {
              console.log(res);
              window.location.href = '/sellerinventory'
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

  }

  getProduct = () => {
    const user = global.auth.getUser();
    const shopID = user['shopID'];
    const productID = window.location.search.slice(11);

    axios.get(`/shops/${shopID}/${productID}`)
    .then((res) => {
        var data = res['data']['products'][0]
        var productName = document.getElementById('productName');
        productName.value = data['productName'];
        var productDescription = document.getElementById('productDescription');
        productDescription.value = data['productDescription'];
        var price = document.getElementById('price');
        price.value = data['productPrice'];
        var quantity = document.getElementById('quantity');
        quantity.value = data['productQuantity'];
    })
    .catch((error) => {
        console.log(error);
    });
  }

  editProduct = () => {
    const user = global.auth.getUser();
    const shopID = user['shopID'];
    const productID = window.location.search.slice(11);

    var productName = document.getElementById('productName').value;
    var productDescription = document.getElementById('productDescription').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;


    axios.patch(`/shops/${shopID}/${productID}`, {
        'productName': productName,
        'productDescription': productDescription,
        'price': price,
        'quantity': quantity
    })
    .then((res) => {
        console.log(res);
        window.location.href = '/sellerinventory'
    })
    .catch((error) => {
        console.log(error);
    });
  }

  onImageChange = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
          if(reader.readyState === 2) {
              this.setState({file: reader.result})
          }
      }
      reader.readAsDataURL(e.target.files[0])
  }

  render() {
    const { file } = this.state;
    if (window.location.search.includes('productID')) {
        this.getProduct();
        return (
            <SellerPageTemplate>
                <form>
                    <div>
                        <label>Product Name</label>
                        <input id='productName'></input>
                    </div>
                    <div>
                        <label>Product Description</label>
                        <input id='productDescription'></input>
                    </div>
                    <div>
                        <label>Price</label>
                        <input id='price'></input>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input id='quantity'></input>
                    </div>
                    <div>
                        <label>Product Image</label>
                        <input type='file' id='productImage'></input>
                    </div>
                    <div>
                        <label>3D Product Image</label>
                        <input type='file' id='3DProductImage'></input>
                    </div>
                    <button type="button" class="btn btn-default" onClick={this.editProduct}>Save</button>
                </form>
            </SellerPageTemplate>
        );
    }
    else {
        return (
            <SellerPageTemplate>
                <form>
                    <div>
                        <label>Product Name</label>
                        <input id='productName'></input>
                    </div>
                    <div>
                        <label>Product Description</label>
                        <input id='productDescription'></input>
                    </div>
                    <div>
                        <label>Price</label>
                        <input id='price'></input>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input id='quantity'></input>
                    </div>
                    <div>
                        <label>Product Image</label>
                        <input type='file' id='productImage' onChange={this.onImageChange}></input>
                        <img id='img' scr={file}/>
                    </div>
                    <div>
                        <label>3D Product Image</label>
                        <input type='file' id='3DProductImage'></input>
                    </div>
                    <button type="button" class="btn btn-default" onClick={this.addProduct}>Add Product</button>
                </form>
            </SellerPageTemplate>
        );
    }
  }
}

export default SellerProduct;