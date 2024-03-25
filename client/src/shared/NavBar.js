import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartManager";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const NavBar = () => {

    // Extract the functions from the Context
    const { cartItems, cartItemCount } = useContext(CartContext);

    return (
        <div>
            <Link to="/category/Telefoner"><h1 style={{color: "red"}}>Telefoner</h1></Link>
            <br />
            <Link to="/category/Tröjor"><h1 style={{color: "royalblue"}}>Tröjor</h1></Link>
            <br />
            <Link to="/cart"><ShoppingCartIcon fontSize="large" color="action"/> ({cartItemCount(cartItems)})</Link>
        </div>
    )
}