import React, { useContext } from 'react';
import { CartContext } from "../context/CartManager";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Cart() {
  // Extract the functions from the Context
  const { cartItems, addToCart, removeFromCart, getCartTotal } = useContext(CartContext)

  return (
    <>
      <div>
        <h1>Varukorgen</h1>
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <img src={`/images/${item.Images[0].imageUrl}`} alt={`Bild 1`} />
              <h2>{item.name}
              <br />
              {item.price}
              </h2><div>
                <button onClick={() => addToCart(item)}><AddCircleIcon/></button>
                <h2>{item.quantity}</h2>
                <button onClick={() => removeFromCart(item.id)}><RemoveCircleIcon/></button>
              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div>
              <h1>Total summa: {getCartTotal(cartItems)} kr</h1>
            </div>
          ) : (
            <h1>Cart is Empty</h1>
          )
        }
      </div>
    </>
  )
}
