import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCart } from '../../features/cart/cartSlice.js';
import CartItem from '../../components/cartItem/CartItem.js';
import './CartPage.css';


export default function CartPage() {
  
    const cart = useSelector(selectCart);
    let subtotal = 0;
    cart.map(item => subtotal += item.quantity * item.unitPrice)

    return (
        <div>
            <main>
                <h1>Shopping Cart</h1>
                {cart.length === 0 ? <></> :
                    <div className="cart-header">
                        <span className="cart-header-item">Item</span>
                        <span className="cart-header-quantity">Quantity</span>
                        <span className="cart-header-price">Price</span>
                    </div>
                }
                <ul>
                    {cart.map((item, index) => {
                        return <CartItem key={index} item={item} />;
                    })}
                </ul>
                {cart.length === 0 
                ? 
                <p>You have nothing in your cart. <Link to={'/shop'}>Click here to keep shopping.</Link></p> 
                : 
                <div>
                    <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
                    <Link to={'/checkout'}><button className='checkout-btn cursor'>Checkout</button></Link>
                </div>
                }
            </main>
        </div>
    );
}