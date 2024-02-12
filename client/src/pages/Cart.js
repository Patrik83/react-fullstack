import React, { useContext } from 'react';
import { CartContext } from '../context/ContextProvider'

export default function Cart() {
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
                <button onClick={() => addToCart(item)}>+</button>
                <h2>{item.quantity}</h2>
                <button onClick={() => removeFromCart(item.id)}>-</button>
              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div>
              <h1>Total summa: {getCartTotal(cartItems)} kr</h1>
              {/* Här kan man lägga till en cart-total funktion & cart-clear*/}
            </div>
          ) : (
            <h1>Cart is Empty</h1>
          )
        }
      </div>
    </>
  )
}
