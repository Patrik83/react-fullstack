import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartManager';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
    // Extract the functions from the Context
    const { cartItems } = useContext(CartContext);

    return (
        <div>
            <Link to="/cart"><ShoppingCartIcon fontSize="large" color="action"/> ({cartItems.length})</Link>
        </div>
    )
}
