import React, { useContext } from 'react';
import { CartContext } from "../../context/CartManager";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import style from "./Cart.module.css";

export default function Cart() {
  // Extrahera funktionerna från Context
  const { cartItems, addToCart, removeFromCart, getCartTotal } = useContext(CartContext)

  // Beräkna totalt antal varor i kundvagnen
  const cartItemCount = cartItems.reduce((total, item) => total + item.amount, 0);
  return (
    <>
      <main className={style.cartWrapper}>
        <section className={style.cartLeftBox}>
          {cartItems.map((item) => (
            <article className={style.cartItem} key={item.id}>
                <img src={`/images/${item.Images[0].imageUrl}`} alt={`Bild 1`} />
                <div className={style.itemDetails}>
                  <h2>{item.name}</h2>
                  <p>{item.price}</p>
                </div>
                  <div className={style.itemButtons}>
                    <button onClick={() => addToCart(item)}><AddCircleIcon/></button>
                    <button onClick={() => removeFromCart(item.id)}><RemoveCircleIcon/></button>
                  </div>
            </article>
          ))}
        </section>
        
        <aside className={style.cartRightBox}>
          {cartItems.length > 0 ? (
            <>
              <p>Totalsumma {getCartTotal(cartItems)} kr</p>
              <br />
              <p>Antal varor i Varukorgen: {cartItemCount}</p>
            </>
          ) : (
            <h1>Varukorgen är tom</h1>
          )}
        </aside>
      </main>
    </>
  )
}
