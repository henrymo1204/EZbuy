import axios from './axios';
import { toast } from 'react-toastify';
const formatPrice = price => {
    return (price).toLocaleString('us', {
      style: 'currency',
      currency: 'USD'
    });
  };

const clearUserCart = () => {
  const userID = global.appState.getUserID();
  try {
    axios.delete(`/cart/items/${userID}`).then(res => {
      if (res.data['success'] == true) {
        toast.success('cart delete success.');
      } else {
        toast.error('cart delete failed.');
      }
    });
  } catch (e) {
    console.log("Failed to delete user " + userID + "with error" + e.message);
  }
}

export {
  formatPrice,
  clearUserCart
}