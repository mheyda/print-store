import { useState } from 'react';
import SizeSelector from '../sizeSelector/SizeSelector.js';
import QuantitySelector from '../quantitySelector/QuantitySelector.js';
import { addToCart } from '../../features/cart/cartSlice.js';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';


export default function AddToCartForm( { product, price, setPrice } ) {

    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleAddToCart = (e) => {
        e.preventDefault();
        
        dispatch(addToCart({
            productId: product.id,
            cartId: uuid(),
            size: selectedSize,
            quantity: selectedQuantity,
            unitPrice: price.replaceAll('$', ''),
            maxQuantity: product.maxQuantity
        }));
    }

    const handleSizeChange = (e) => {
        const size = e.target.value;
        setSelectedSize(size);
        setPrice(`$${product.prices[product.sizes.indexOf(size)]}`);
    }

    const handleQuantityChange = (e) => {
        setSelectedQuantity(Number(e.target.value));
    }

    return (
        <form className='add-to-cart-form' onSubmit={handleAddToCart}>
            <SizeSelector product={product} handleChange={handleSizeChange} />
            <QuantitySelector product={product} handleChange={handleQuantityChange} />
            <input className='add-to-cart cursor' type='submit' value='Add to Cart' />
        </form>
      );

}