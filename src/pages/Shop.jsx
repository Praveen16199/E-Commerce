import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Shop = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    return (
        <div className="shop-page container">


            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="price">₹{product.price}</p>
                            <div className="card-actions">
                                <Link to={`/product/${product.id}`} className="btn btn-secondary">View</Link>
                                <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && <p>No products found in this category.</p>}
            </div>
        </div>
    );
};

export default Shop;
