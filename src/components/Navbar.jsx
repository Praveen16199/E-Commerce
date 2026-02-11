import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="logo">FashionStore</Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
                </div>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-link">
                        <ShoppingCart />
                        {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                    </Link>

                    {user ? (
                        <div className="user-menu">
                            <span className="username">Hi, {user.username}</span>
                            <button onClick={handleLogout} className="logout-btn" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
