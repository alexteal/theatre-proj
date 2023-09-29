import React from 'react';

const Cart = ({ cart, onRemoveFromCart }) => {
  return (
    <div className="cart">
      <h3>Your Cart</h3>
      <ul>
        {cart.map(movie => (
          <li key={movie.id}>
            {movie.title} <button onClick={() => onRemoveFromCart(movie)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
