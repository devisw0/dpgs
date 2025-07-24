import React from 'react';
import './CartPage.css';

export default function CheckoutPage() {
  return (
    <div className="cart-page-container" style={{ minHeight: '60vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <div className="cart-summary-box" style={{ textAlign: 'center' }}>
        <h2>Checkout</h2>
        <p>This is a placeholder for the checkout process.</p>
      </div>
    </div>
  );
} 