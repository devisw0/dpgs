import React from 'react';

function getCartItemsWithQuantities(cart) {
  // If cart items have a quantity field, use it. Otherwise, count by id.
  const map = new Map();
  cart.forEach(item => {
    const key = item.id || item._id || item.name;
    if (map.has(key)) {
      map.get(key).quantity += item.quantity ? item.quantity : 1;
    } else {
      map.set(key, { ...item, quantity: item.quantity ? item.quantity : 1 });
    }
  });
  return Array.from(map.values());
}

const CartPopup = ({ cart }) => {
  const items = getCartItemsWithQuantities(cart);
  return (
    <div style={{ maxHeight: 392, overflowY: 'auto', minWidth: 260, padding: 8, background: 'rgba(30,30,30,0.97)', borderRadius: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', color: '#fff' }}>
      {items.length === 0 ? (
        <div style={{ color: '#bbb', textAlign: 'center', padding: '1.5rem 0' }}>Your cart is empty.</div>
      ) : (
        items.map((item, idx) => (
          <div key={item.id || idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: idx !== items.length - 1 ? '1px solid #333' : 'none' }}>
            <img src={item.image} alt={item.title || item.name} style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 6, background: '#222' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#fff', lineHeight: 1.2 }}>{item.title || item.name}</div>
              <div style={{ fontSize: 13, color: '#bbb' }}>Qty: {item.quantity}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPopup; 