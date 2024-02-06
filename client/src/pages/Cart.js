import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'

export default function Cart() {

const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

return (
    <>

<div>
  <h1>Cart</h1>
  <div>
    {cartItems.map((item) => (
      <div key={item.id}>
        <div>
          <img src={item} alt={item.title} />
          <div>
            <h1>{item.name}</h1>
            <p>{item.price}</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              addToCart(item)
            }}
          >
            +
          </button>
          <p>{item.quantity}</p>
          <button
            onClick={() => {
              removeFromCart(item)
            }}
          >
            -
          </button>
        </div>
      </div>
    ))}
  </div>
  {
    cartItems.length > 0 ? (
      <div>
    <h1>Total: ${getCartTotal()}</h1>
    <button
      onClick={() => {
        clearCart()
      }}
    >
      Rensa karten fi fan
    </button>
  </div>
    ) : (
      <h1>Carten e ju tom</h1>
    )
  }
</div>


      </>
    )
  }
