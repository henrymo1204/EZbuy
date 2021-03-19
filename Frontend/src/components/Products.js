import React from 'react';

const Products = ({id, name, description, img, price }) => {

  return (
    <section>
      <img src={img}></img>
      <p>{name}</p>
      <p>
        <button className="button">Add</button>
      </p>
      <p>$ {price}</p>
    </section>
  );
};

export default Products;

{/* got the code from https://www.youtube.com/watch?v=2-S-FiEl07I */}