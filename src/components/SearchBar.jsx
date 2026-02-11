import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { products } = useProducts();
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query, products]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setShowSuggestions(false);
            // Navigate to shop with search query if we were to implement full search page
            // For now, let's just pick the first suggestion or do nothing if exact match isn't targeted
            // But typically we'd go to /shop?search=query
            // Let's implement that in Shop.jsx
            navigate(`/shop?search=${query}`);
        }
    };

    const handleSuggestionClick = (id) => {
        navigate(`/product/${id}`);
        setQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="search-bar" ref={searchRef}>
            <form onSubmit={handleSearch}>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length > 0 && setShowSuggestions(true)}
                    />
                    <button type="submit" className="search-icon-btn">
                        <Search size={18} />
                    </button>
                </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(product => (
                        <li key={product.id} onClick={() => handleSuggestionClick(product.id)}>
                            <img src={product.image} alt={product.name} />
                            <div className="suggestion-info">
                                <span className="suggestion-name">{product.name}</span>
                                <span className="suggestion-category">{product.category}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
