import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty.</h2>
        <Link to="/shop" className="start-shopping-btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <label>Qty:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>TBD</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;