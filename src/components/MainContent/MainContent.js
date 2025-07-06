import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromoBanner from './PromoBanner';
import './MainContent.css';

function MainContent() {
  const navigate = useNavigate();

  const handleShopClick = (filter) => {
    navigate(`/shop?filter=${filter}`);
  };

  return (
    <main className="main-content">
      <div className="section-row">
        <PromoBanner
          title="New Arrivals"
          description="Discover the latest trends in fashion."
          buttonText="Shop Now"
          imageUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
          size="small"
          onButtonClick={() => handleShopClick('newArrivals')}
        />
        <PromoBanner
          title="Accessories"
          description="Find the perfect accessories to match your outfit."
          buttonText="Shop Now"
          imageUrl="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
          size="small"
          onButtonClick={() => handleShopClick('accessories')}
        />
        <PromoBanner
          title="Customer Service"
          description="We're here to help you with any inquiries."
          buttonText="Contact Us"
          imageUrl="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80"
          size="small"
        />
      </div>
      <div className="section-row">
        <PromoBanner
          title="Exclusive Collection"
          description="Explore our exclusive collection for this season."
          buttonText="Shop Now"
          imageUrl="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
          onButtonClick={() => handleShopClick('exclusive')}
        />
        <PromoBanner
          title="Profile"
          description="Manage your account and preferences."
          buttonText="View Profile"
          imageUrl="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
          size="small"
        />
      </div>
      <div className="section-row">
        <PromoBanner
          title="Sale"
          description="Grab your favorite items at discounted prices."
          buttonText="Shop Now"
          imageUrl="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
          size="small"
          onButtonClick={() => handleShopClick('sale')}
        />
        <PromoBanner
          title="Fast Delivery"
          description="Enjoy fast and reliable delivery services."
          buttonText="Shop Now"
          imageUrl="https://images.unsplash.com/photo-1464983953574-0892a716854b"
        />
      </div>
    </main>
  );
}

export default MainContent; 