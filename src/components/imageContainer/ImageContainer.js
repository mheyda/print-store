import ThumbnailImages from '../thumbnailImages/ThumbnailImages.js';


export default function ImageContainer( {productImages, openModal, imageIndex, setImageIndex} ) {

    return (
        <div className='detail-image-container'>
            <img className='detail-primary-image cursor' src={require(`../../assets/images/${productImages[imageIndex].mainSrc}`)} alt={productImages[imageIndex].mainAlt} onClick={openModal} />
            <ThumbnailImages images={productImages} handleClick={(e) => setImageIndex(e.target.id)} />
        </div>
  );
}
