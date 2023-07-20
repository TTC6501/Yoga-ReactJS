import React from 'react';

export default function Footer() {
    return (
        <footer style={footerStyle}>
            <div className="container">
                <div style={footerContentStyle}>
                    <div style={logoStyle}>Yoga</div>
                    <p style={textStyle}>
                        Experience the tranquility of Yoga and find your inner balance.
                    </p>
                </div>
                <div style={socialMediaStyle}>
                    <a href="#" style={iconStyle}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" style={iconStyle}>
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" style={iconStyle}>
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

const footerStyle = {
    backgroundColor: '#222',
    padding: '40px 0',
    color: '#fff',
};

const footerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
};

const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: '10px',
};

const textStyle = {
    fontSize: '14px',
    lineHeight: '1.5',
};

const socialMediaStyle = {
    textAlign: 'center',
};

const iconStyle = {
    color: '#fff',
    fontSize: '20px',
    margin: '0 8px',
};
