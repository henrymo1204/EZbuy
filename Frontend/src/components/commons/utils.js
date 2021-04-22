export const formatPrice = price => {
    return (price).toLocaleString('us', {
      style: 'currency',
      currency: 'USD'
    });
  };