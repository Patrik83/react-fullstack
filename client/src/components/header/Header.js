import React, { useContext} from "react";
import { Nav } from "../../shared/Nav";
import { CartContext } from "../../context/CartManager";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export default function Header() {
    const { cartItemCount } = useContext(CartContext);

    return (
        <div style={{textAlign: "right"}}>
            <Link to="/cart"><ShoppingCartIcon fontSize="large" color="action"/> ({cartItemCount()})</Link>
            <Nav />
        </div>
        
    )
}
