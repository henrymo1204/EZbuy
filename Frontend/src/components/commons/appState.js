import axios from './axios';
import decode from 'jwt-decode';

//Cart related application state
const updateLocalCartNum = async () => {
    const remoteCartNum = await getRemoteCartNum();
    localStorage.setItem('Cart_Num', remoteCartNum);
};
  
const setLocalCartNum = (cart_num) => {
  localStorage.setItem('Cart_Num', cart_num);
};

const getLocalCartNum = () => {
    return localStorage.getItem('Cart_Num');
};

const getRemoteCartNum = async () => {
    const userID = getUserID();
    const response = await axios.get(`/api/v1/cart/items?userID=${userID}`);
    const cartItems = response.data['items'] || []
    const cartNum = cartItems.map(item => item['productQuantity']).reduce((sum, change) => sum + change, 0); 
    return cartNum;
  };

//User related application state
const getUserID = () => {
  let userID = null;

  if (global.auth.isLogin()) {
    const jwToken = localStorage.getItem('JWT');
    const userInfo = decode(jwToken);
    userID = userInfo['userID'];
  }

  return userID;
};

//Search related application state
const updateSearchResult = async (keyword) => {
  try {
    let inventoryServiceResponse = await axios.get(`/api/v1/products/search/${keyword}`);
    let searchResultList = inventoryServiceResponse.data['product'];
    localStorage.setItem('Search_Result', JSON.stringify(searchResultList));
    console.log(inventoryServiceResponse);
  } catch (e) {
    console.log(e);
  }
}

const getSearchResult = () => {
  return JSON.parse(localStorage.getItem('Search_Result'));
}

const setSearchResult = (searchResultList) => {
  localStorage.setItem('Search_Result', JSON.stringify(searchResultList));
}

const updateProductCatagory = async () => {
  try {
    let inventoryServiceResponse = await axios.get('/api/v1/products/')
    let catagoryList = inventoryServiceResponse.data['options'];
    localStorage.setItem('Product_Catagory', JSON.stringify(catagoryList));
    console.log(inventoryServiceResponse);
  } catch (e) {
    console.log(e);
  }
}

const getProductCatagory = () => {
  return JSON.parse(localStorage.getItem('Product_Catagory'));
}


const setRandomProducts = async () => {
  try {
    let response = await axios.get('/api/v1/products/random/');
    let result = response.data['products'];
    localStorage.setItem('Random_Products', JSON.stringify(result));
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}


const getRandomProducts = () => {
  return JSON.parse(localStorage.getItem('Random_Products'));
}


global.appState = {
    updateLocalCartNum,
    getLocalCartNum,
    setLocalCartNum,
    getUserID,
    getSearchResult,
    setSearchResult,
    updateSearchResult,
    updateProductCatagory,
    getProductCatagory,
    setRandomProducts,
    getRandomProducts
};
