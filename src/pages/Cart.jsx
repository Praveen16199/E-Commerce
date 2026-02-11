import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page container empty-cart">
                <h2>Your Cart is Empty</h2>
                <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>₹{item.price}</p>
                        </div>
                        <div className="item-quantity">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <p className="item-total">₹{item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ₹{totalAmount}</h3>
                <button onClick={clearCart} className="btn btn-secondary">Clear Cart</button>
                <button onClick={handleCheckout} className="btn btn-primary">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
