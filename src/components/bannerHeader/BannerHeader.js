import './BannerHeader.css';


export default function BannerHeader( { title, buttonContent, href, imgSrc, imgAlt}) {

    const bannerImage = require(`../../${imgSrc}`);

    return (
        <section className='banner'>
            <div className='banner-content'>
                <h2 className='banner-title'>{title}</h2>
                <br></br>
                <a href={href} class="cursor banner-button hover-opacity">{buttonContent}</a>
            </div>
            <img className='banner-image' src={bannerImage} alt={imgAlt} />
        </section>
    );
}
