import './ShopPage.css';
import Products from '../../components/products/Products.js';
import BannerHeader from '../../components/bannerHeader/BannerHeader.js';


export default function ShopPage() {

    return (
        <>
            <BannerHeader title={'SHOP'} buttonContent={'Explore'} href={'#shop'} imgSrc={'assets/images/banners/banner 2.jpg'} imgAlt={'Header Background of Midtown Atlanta, Georgia'} />
            <Products />
        </>
    );
}
