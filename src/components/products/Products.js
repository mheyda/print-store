import Product from './Product.js';
import './Products.css';


export const products = require('../../assets/data/products.json');

export default function Products() {

  return (
    <>
      <main id='shop'>
        <ul className='shop-container'>
            {Object.values(products).map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </ul>
      </main>
    </>
  );
}
