import { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

function groupCartItems(cart) {
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

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const items = groupCartItems(cart);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleAdd = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const handleRemove = (item) => {
    let found = false;
    const newCart = [];
    for (const cartItem of cart) {
      const key = cartItem.id || cartItem._id || cartItem.name;
      const itemKey = item.id || item._id || item.name;
      if (!found && key === itemKey) {
        found = true;
        continue;
      }
      newCart.push(cartItem);
    }
    setCart(newCart);
  };

  return (
    <div className="cartpage-root">
      <div className="cartpage-main">
        <h2 className="cartpage-title">Your Cart</h2>
        {items.length === 0 ? (
          <div className="cartpage-empty">Your cart is empty.</div>
        ) : (
          <div className="cartpage-list">
            {items.map((item, idx) => (
              <div className="cartpage-item" key={item.id || item._id || idx}>
                <img className="cartpage-item-img" src={item.image} alt={item.name || item.title} />
                <div className="cartpage-item-info">
                  <div className="cartpage-item-name">{item.name || item.title}</div>
                  <div className="cartpage-item-price">${item.price.toFixed(2)} <span className="cartpage-item-unit">/ unit</span></div>
                </div>
                <div className="cartpage-item-qty">
                  <button className="cartpage-qty-btn" onClick={() => handleRemove(item)}>-</button>
                  <span className="cartpage-qty-num">{item.quantity}</span>
                  <button className="cartpage-qty-btn" onClick={() => handleAdd(item)}>+</button>
                </div>
                <div className="cartpage-item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cartpage-summary">
        <div className="cartpage-summary-box">
          <h3>Order Summary</h3>
          <div className="cartpage-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="cartpage-checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
