import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainContent.css';

function HomeContent() {
  const navigate = useNavigate();

  const handleShopClick = (filter) => {
    navigate(`/shop?filter=${filter}`);
  };

  return (
    <main className="main-content">
      <div className="section-row">
        <div className="promo-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80)' }}>
          <div className="promo-overlay">
            <h2>New Arrivals</h2>
            <p>Discover the latest trends in fashion.</p>
            <button className="promo-btn" onClick={() => handleShopClick('newArrivals')}>Shop Now &rarr;</button>
          </div>
        </div>
        <div className="promo-banner promo-banner-small" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80)' }}>
          <div className="promo-overlay">
            <h2>Accessories</h2>
            <p>Find the perfect accessories to match your outfit.</p>
            <button className="promo-btn" onClick={() => handleShopClick('accessories')}>Shop Now &rarr;</button>
          </div>
        </div>
        <div className="promo-banner promo-banner-small" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80)' }}>
          <div className="promo-overlay">
            <h2>Customer Service</h2>
            <p>We're here to help you with any inquiries.</p>
            <button className="promo-btn">Contact Us &rarr;</button>
          </div>
        </div>
      </div>
      <div className="section-row">
        <div className="promo-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f)' }}>
          <div className="promo-overlay">
            <h2>Exclusive Collection</h2>
            <p>Explore our exclusive collection for this season.</p>
            <button className="promo-btn" onClick={() => handleShopClick('exclusive')}>Shop Now &rarr;</button>
          </div>
        </div>
        <div className="promo-banner promo-banner-small" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80)' }}>
          <div className="promo-overlay">
            <h2>Profile</h2>
            <p>Manage your account and preferences.</p>
            <button className="promo-btn">View Profile &rarr;</button>
          </div>
        </div>
        <div className="promo-banner promo-banner-small" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80)' }}>
          <div className="promo-overlay">
            <h2>Sale</h2>
            <p>Grab your favorite items at discounted prices.</p>
            <button className="promo-btn" onClick={() => handleShopClick('sale')}>Shop Now &rarr;</button>
          </div>
        </div>
      </div>
      <div className="section-row">
        <div className="promo-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b)' }}>
          <div className="promo-overlay">
            <h2>Fast Delivery</h2>
            <p>Enjoy fast and reliable delivery services.</p>
            <button className="promo-btn">Shop Now &rarr;</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomeContent; 