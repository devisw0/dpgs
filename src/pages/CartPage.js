import { useContext } from 'react';
import { CartContext } from '../CartContext';

export default function CartPage() {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
