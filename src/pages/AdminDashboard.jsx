import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '', category: '', price: '', image: '', description: ''
    });

    if (!user || user.role !== 'admin') {
        return <div className="container">Access Denied</div>;
    }

    const handleChange = (e) => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateProduct(currentProduct);
            setIsEditing(false);
        } else {
            addProduct(currentProduct);
        }
        setCurrentProduct({ name: '', category: '', price: '', image: '', description: '' });
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <div className="admin-dashboard container">
            <h2>Admin Dashboard</h2>

            <div className="admin-grid">
                <div className="product-form-section">
                    <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" value={currentProduct.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Category</label>
                            <select name="category" value={currentProduct.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" name="price" value={currentProduct.price} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input type="url" name="image" value={currentProduct.image} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea name="description" value={currentProduct.description} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Product</button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(false); setCurrentProduct({ name: '', category: '', price: '', image: '', description: '' }); }} className="btn btn-secondary">Cancel</button>
                        )}
                    </form>
                </div>

                <div className="product-list-section">
                    <h3>Product List</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        <button onClick={() => handleEdit(product)} className="btn btn-sm btn-secondary">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
