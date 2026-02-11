import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });

    if (cart.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate order placement
        alert(`Order Placed Successfully! Total Amount: ₹${totalAmount}\nPayment: Cash on Delivery`);
        clearCart();
        navigate('/');
    };

    return (
        <div className="checkout-page container">
            <h2>Checkout</h2>
            <div className="checkout-grid">
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    {cart.map(item => (
                        <div key={item.id} className="summary-item">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="total">
                        <strong>Total: ₹{totalAmount}</strong>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="shipping-form">
                    <h3>Shipping Details</h3>
                    <div>
                        <label>Full Name</label>
                        <input type="text" name="fullName" required onChange={handleChange} />
                    </div>
                    <div>
                        <label>Address</label>
                        <textarea name="address" required onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" name="city" required onChange={handleChange} />
                    </div>
                    <div>
                        <label>Zip Code</label>
                        <input type="text" name="zipCode" required onChange={handleChange} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type="tel" name="phone" required onChange={handleChange} />
                    </div>
                    <div className="payment-method">
                        <h3>Payment Method</h3>
                        <label>
                            <input type="radio" checked readOnly /> Cash on Delivery
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
