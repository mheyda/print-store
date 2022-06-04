import { useParams } from "react-router-dom";
import { useState } from 'react';
import { products } from '../../components/products/Products.js';
import AddToCartForm from '../../components/addToCartForm/AddToCartForm.js';
import ImageContainer from '../../components/imageContainer/ImageContainer.js';
import ImageModal from '../../components/imageModal/ImageModal.js';
import './DetailPage.css';


export default function ProductDetail() {
  
  const params = useParams();
  const product = products[params.productId];
  const [price, setPrice] = useState(`From $${product.prices[0]}`);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openModal = () => {
      setModalIsOpen(true);
  }

  const closeModal = () => {
      setModalIsOpen(false);
  }

  const prevImage = () => {
    if (parseInt(imageIndex) === 0) {
      setImageIndex(product.productImages.length - 1);
    } else {
      setImageIndex(parseInt(imageIndex) - 1);
    }
  }

  const nextImage = () => {
    if (parseInt(imageIndex) === product.productImages.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(parseInt(imageIndex) + 1);
    }
  }

  return (
    <div>
      {modalIsOpen ? <ImageModal productImages={product.productImages} imageIndex={imageIndex} setImageIndex={setImageIndex} prevImage={prevImage} nextImage={nextImage} closeModal={closeModal} /> : <></>}
      <main className='detail-container'>
        <ImageContainer productImages={product.productImages} imageIndex={imageIndex} setImageIndex={setImageIndex} openModal={openModal} />
        <div className='detail-content'>
          <h2 className='product-title'>{product.name.replaceAll('-', ' ')}</h2>
          <p className='product-price'>{price}</p>
          <AddToCartForm product={product} price={price} setPrice={setPrice} />
        </div>
      </main>
    </div>
  );
}