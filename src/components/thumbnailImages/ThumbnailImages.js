
export default function ThumbnailImages( { images, handleClick } ) {



    return (
        <div className='thumbnail-container'>
            {images.map((image, index) => {
                const imageSrc = require(`../../assets/images/${image.thumbSrc}`)
                return <img className='thumbnail-image cursor' key={index} id={index} src={imageSrc} alt={image.thumbAlt} onClick={handleClick} />
            })}
        </div>
  );
}


