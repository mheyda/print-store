import { Link } from "react-router-dom";
import './Products.css';

export default function Product( { product } ) {

    const imageSrc = require(`../../assets/images/${product.productImages[0].mainSrc}`)
    const imageAlt = product.productImages[0].mainAlt;

    return (
    <li className='shop-item'>
        <Link to={`/products/${product.name}/${product.id}`} className='hover-opacity'>
            <img className="shop-image" src={imageSrc} alt={imageAlt}/>
            <p className="">{product.name.replaceAll('-', ' ')}</p>
            <p className="shop-price">From ${product.prices[0]}</p>
        </Link>
    </li>
  );
}
