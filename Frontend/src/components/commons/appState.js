import axios from './axios';
import decode from 'jwt-decode';

//Cart related application state
const updateLocalCartNum = async () => {
    const remoteCartNum = await getRemoteCartNum();
    localStorage.setItem('Cart_Num', remoteCartNum);
  };
  
const getLocalCartNum = () => {
    return localStorage.getItem('Cart_Num');
};

const getRemoteCartNum = async () => {
    const userID = getUserID();
    const response = await axios.get(`/cart/items?userID=${userID}`);
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

global.appState = {
    updateLocalCartNum,
    getLocalCartNum,
    getUserID
};
