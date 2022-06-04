import { Link } from "react-router-dom";
import { products } from '../products/Products.js';
import { useState } from 'react';
import { updateCart, removeFromCart } from '../../features/cart/cartSlice.js';
import { useDispatch } from 'react-redux';


export default function CartItem({ item: { cartId, productId, size }, item }) {

    const dispatch = useDispatch();
    const product = products[productId];
    const imageSrc = require(`../../assets/images/${product.productImages[0].mainSrc}`)
    const imageAlt = product.productImages[0].mainAlt;

    const [quantity, setQuantity] = useState(item.quantity);


    const handleUpdateItem = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        dispatch(updateCart({
            cartId: cartId,
            quantity: value
        }))
        setQuantity(value);
    }

    const handleDeleteItem = (e) => {
        dispatch(removeFromCart({
            cartId: cartId,
            size: size
        }));
    }

    return (
    <li className='cart-item'>
        <button className='remove-from-cart cursor' onClick={handleDeleteItem}>&times;</button>
        <Link to={`/products/${product.name}/${product.id}`}>
            <img className='cart-image' src={imageSrc} alt={imageAlt}/>
        </Link>
        <div className='cart-description'>
            <h2>{product.name.replaceAll('-', ' ')}</h2>
            <span className='cart-product-size'>Size: {size}</span>
        </div>
        <input type="number" value={quantity} min="1" max={product.maxQuantity} aria-label="Quantity" onChange={handleUpdateItem} />
        <span className='cart-price'>${(product.prices[product.sizes.indexOf(size)] * quantity).toFixed(2)}</span>

    </li>
  );
}
