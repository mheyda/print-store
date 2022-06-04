import { useState } from 'react';
import { products } from '../products/Products.js';
import { updateCart, removeFromCart } from '../../features/cart/cartSlice.js';
import { useDispatch } from 'react-redux';


export default function CheckoutItem( { cartItem } ) {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const product = products[cartItem.productId];
    const itemImage = require(`../../assets/images/${product.productImages[0].mainSrc}`);

    const handleUpdateItem = (e) => {
            let { value, min, max } = e.target;
            value = Math.max(Number(min), Math.min(Number(max), Number(value)));

            dispatch(updateCart({
                cartId: cartItem.cartId,
                quantity: value
            }));
            setQuantity(value);
    }

    const handleDeleteItem = () => {
        dispatch(removeFromCart({
            cartId: cartItem.cartId,
            size: cartItem.size
        }));
    }

    return (
        <li className='checkout-item'>
            <img className="checkout-image" src={itemImage} alt={product.productImages[0].mainAlt} />
            <div className="checkout-description">
                <h2 className="checkout-product-name">{product.name.replaceAll('-', ' ')}</h2>
                <span className="checkout-product-size">Size: {cartItem.size}</span>
            </div>
            <div className="checkout-specifics">
                <h3 className="checkout-price">${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}</h3>
                <input onChange={handleUpdateItem} className="checkout-quantity" type="number" value={quantity} min="1" max={product.maxQuantity} aria-label="Quantity" />
                <button onClick={handleDeleteItem} className="remove-from-checkout cursor" aria-label="Remove From Cart">Remove</button>
            </div>
        </li>
    );
}
