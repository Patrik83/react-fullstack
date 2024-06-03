import React, { useContext } from 'react';
import { CartContext } from "../../context/CartManager";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import style from "./CartPage.module.css";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext)

  // Beräknar totala antalet varor i kundvagnen
  const cartItemCount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (  
      <main className={style.cartWrapper}>
        <section className={style.cartLeftBox}>
        {/* Visa meddelande ifall tom */}
        {cartItems.length === 0 && <h1>Varukorgen är tom</h1>}
        {/* Annars visa tillagda produkter */}
          {cartItems.map((item) => (
            <article className={style.cartItem} key={item.id}>
              <img src={`/images/${item.Images[0].imageUrl}`} alt={`Bild på ${item.name}`} />
              <div className={style.itemDetails}>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
              </div>
              <div className={style.itemButtons}>
                <button onClick={() => addToCart(item)}>
                  <AddCircleIcon/> {/* Ikon för att öka kvantitet */}
                </button>
                <button onClick={() => removeFromCart(item.id)}>
                  <RemoveCircleIcon/> {/* Ikon för att minska kvantiet */}
                </button>
              </div>
            </article>
          ))}
        </section>
        {/* Höger sidomeny med orderinformation */}
        <aside className={style.cartRightBox}>
            <p>Totalsumma {getCartTotal()} kr</p>
            <br />
            <p>Antal varor {cartItemCount}</p>
            <br />
            {/* Finns inga varor i varukorgen döljs knappen */}
            {cartItems.length > 0 && ( 
              <button onClick={() => clearCart()}>Töm Varukorgen</button>
            )}
        </aside>
      </main>
  )
}
