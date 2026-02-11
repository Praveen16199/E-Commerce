import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext(null);

const initialProducts = [
    // Men
    { id: 1, name: 'Mens Casual Shirt', category: 'Men', price: 1200, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400', description: 'Comfortable cotton shirt' },
    { id: 5, name: 'Mens Denim Jacket', category: 'Men', price: 3500, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=400', description: 'Classic denim jacket' },
    { id: 6, name: 'Mens Chino Trousers', category: 'Men', price: 1800, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400', description: 'Slim fit chinos' },

    // Women
    { id: 2, name: 'Womens Summer Dress', category: 'Women', price: 2500, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=400', description: 'Floral print summer dress' },
    { id: 7, name: 'Womens Handbag', category: 'Women', price: 4500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', description: 'Stylish leather handbag' },
    { id: 8, name: 'Womens Heels', category: 'Women', price: 3200, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400', description: 'Elegant high heels' },

    // Kids
    { id: 3, name: 'Kids T-Shirt', category: 'Kids', price: 600, image: 'https://images.unsplash.com/photo-1519238263496-65260f412150?auto=format&fit=crop&q=80&w=400', description: 'Fun graphic tee' },
    { id: 9, name: 'Kids Denim Overalls', category: 'Kids', price: 1500, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=400', description: 'Cute denim overalls' },
    { id: 10, name: 'Kids Sneakers', category: 'Kids', price: 1200, image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=400', description: 'Comfortable sneakers' },

    // Accessories
    { id: 4, name: 'Leather Watch', category: 'Accessories', price: 3500, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', description: 'Classic leather wristwatch' },
    { id: 11, name: 'Sunglasses', category: 'Accessories', price: 1500, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', description: 'UV protection sunglasses' },
    { id: 12, name: 'Beanie Hat', category: 'Accessories', price: 800, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400', description: 'Warm wool beanie' },
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
    }, []);

    const addProduct = (product) => {
        const newProducts = [...products, { ...product, id: Date.now() }];
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    const updateProduct = (updatedProduct) => {
        const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    const deleteProduct = (id) => {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
