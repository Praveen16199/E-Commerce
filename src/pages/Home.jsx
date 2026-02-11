import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Home = () => {
    const { products } = useProducts();
    const featuredProducts = products.slice(0, 3);
    const categories = ['Men', 'Women', 'Kids', 'Accessories'];

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>New Season Arrivals</h1>
                    <p>Check out all the new trends</p>

                </div>
            </section>

            <section className="categories-section container">
                <h2>Categories</h2>
                <div className="categories-grid">
                    {categories.map(cat => (
                        <Link to={`/shop?category=${cat}`} key={cat} className="category-card">
                            <h3>{cat}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="featured-section container">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>₹{product.price}</p>
                                <Link to={`/product/${product.id}`} className="btn btn-secondary">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
