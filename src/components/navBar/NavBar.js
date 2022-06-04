import { Link } from "react-router-dom";
import { HashLink as NavLink } from 'react-router-hash-link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../features/cart/cartSlice.js';
import './NavBar.css';


export default function NavBar() {

    const cart = useSelector(selectCart);

    let cartQuantity = 0;
    cart.map(item => cartQuantity += parseInt(item.quantity));

    const iconSrc = require('../../assets/icons/mountain-logo-white.png');

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        mobileNavOpen ? setMobileNavOpen(false) : setMobileNavOpen(true);
        mobileNavOpen ? document.body.style.overflow = 'scroll' : document.body.style.overflow = 'hidden';
    }

    return (
        <nav>
            <div id="header-nav">
                <NavLink to={'/'} className='hover-opacity'>Home</NavLink>
                <NavLink to={'/#about'} className="cursor hover-opacity">About</NavLink>
                <NavLink to={'/shop'} className='hover-opacity'>Shop</NavLink>
                <NavLink to={'/contact'} className='hover-opacity'>Contact</NavLink>
            </div>

            {mobileNavOpen ?
            <>
                <i id="menu" className='fa-solid fa-xmark' onClick={toggleMobileNav}></i>
                <div id="mobile-nav" className='fade-in-animation'>
                    <NavLink to={'/'} onClick={toggleMobileNav} className="cursor hover-opacity">Home</NavLink>
                    <NavLink to={'/#about'} onClick={toggleMobileNav} className="cursor hover-opacity">About</NavLink>
                    <NavLink to={'/shop'} onClick={toggleMobileNav} className="cursor hover-opacity">Shop</NavLink>
                    <NavLink to={'/contact'} onClick={toggleMobileNav} className="cursor hover-opacity">Contact</NavLink>
                </div>
            </>
            : <i id="menu" className='fa fa-bars' onClick={toggleMobileNav}></i>
            }
            
            
            <Link to={'/'} className="logo cursor hover-opacity" aria-hidden="true"><img src={iconSrc} alt="Home Mountain Logo" height="100px" /></Link>
            <Link className='cart hover-opacity' to={'/cart'}>
                Cart
                <div className="cart-symbol" aria-hidden="true">
                    <span className="cart-count">{cartQuantity > 0 ? cartQuantity > 99 ? '100+' : cartQuantity : ''}</span>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </Link>
        </nav>
    );
}
