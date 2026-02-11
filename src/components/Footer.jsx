import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>123 Fashion Street, Create City, 12345</p>
                        <p>Email: contact@fashionstore.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </div>
                </div>
                <p className="copyright">&copy; {new Date().getFullYear()} FashionStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
