import axios from './axios';

const updateLocalCartNum = async () => {
    const remoteCartNum = await getRemoteCartNum();
    localStorage.setItem('Cart_Num', remoteCartNum);
  };
  
const getLocalCartNum = () => {
    return localStorage.getItem('Cart_Num');
};

const getRemoteCartNum = async (userID) => {
    userID = 1;
    const response = await axios.get(`/cart/items?userID=${userID}`);
    const cartItems = response.data['items'] || []
    const cartNum = cartItems.map(item => item['productQuantity']).reduce((sum, change) => sum + change, 0); 
    return cartNum;
  };

global.appState = {
    updateLocalCartNum,
    getLocalCartNum
};
