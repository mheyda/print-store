import './ImageModal.css';


export default function ImageModal( {productImages, imageIndex, prevImage, nextImage, closeModal }) {

    return (
        <div className='modal-container'>
            <div className="modal-content">
                <img className='modal-image' src={require(`../../assets/images/${productImages[imageIndex].mainSrc}`)} alt={productImages[imageIndex].mainAlt} />
                <span className="prev cursor" onClick={prevImage}>&#10094;</span>
                <span className="next cursor" onClick={nextImage}>&#10095;</span>
                <span className="close cursor" onClick={closeModal}>&times;</span>
            </div>
        </div>
  );
}
