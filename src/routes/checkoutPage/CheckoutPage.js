import './CheckoutPage.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../features/cart/cartSlice';
import CheckoutItem from '../../components/checkoutItem/CheckoutItem.js';


export default function CheckoutPage() {

    const cart = useSelector(selectCart);

    const taxRate = 0.08;
    let subtotal = 0;
    cart.map(item => {
        return subtotal += item.unitPrice * item.quantity;
    })

    const [email, setEmail] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');

 
    const [formIndex, setFormIndex] = useState(0);


    return (
        <>
            <main id="checkout">
                <div className="user-information">
                    <div className="user-information-box user-email-container">
                        <h1 className="user-information-header">1. Your Email</h1>
                        {formIndex === 0 ?
                        <form onSubmit={(e) => {setFormIndex(1); e.preventDefault();}} className="input-form input-form-email active">
                            <input onChange={(e) => setEmail(e.target.value)} className="input-email full-width" value={email} type="email" placeholder="username@example.com" aria-label="Email Address" autoFocus />
                            <input className="full-width cursor" type="submit" value="Continue"/>
                        </form>
                        :
                        <></>
                        }
                        {formIndex > 0 ?
                        <>
                            <button onClick={() => setFormIndex(0)} className="input-edit button-plain">Edit</button>
                            <div className="user-input">{email}</div>
                        </>
                        :
                        <></>
                        }
                    </div>
                    <div className="user-information-box user-shipping-container">
                        <h1 className="user-information-header">2. Shipping</h1>
                        {formIndex === 1 ?
                        <form onSubmit={e => {e.preventDefault(); setFormIndex(2);}} className="input-form input-form-shipping">
                            <div className="flex">
                                <input className="half-width" onChange={e => setFirstName(e.target.value)} value={firstName} type="text" maxLength="100" placeholder="First Name" required/>
                                <input className="half-width" onChange={e => setLastName(e.target.value)} value={lastName} type="text" maxLength="100" placeholder="Last Name" required/>
                            </div>
                            <input className="full-width" onChange={e => setAddressLine1(e.target.value)} value={addressLine1} type="text" placeholder="Address Line 1" required/>
                            <input className="full-width" onChange={e => setAddressLine2(e.target.value)} value={addressLine2} type="text" placeholder="Address Line 2"/>
                            <select className="full-width cursor" onChange={e => setCountry(e.target.value)} value={country} aria-label="Country" required>
                                <option value="" disabled selected hidden>Country</option>
                                <option>United States</option>
                            </select>
                            <div className="flex">
                                <input className="quarter-width" onChange={e => setZipCode(e.target.value)} value={zipCode} type="text" pattern="[0-9]{5}" placeholder="Zip Code" required/>
                                <input className="half-width" onChange={e => setCity(e.target.value)} value={city} type="text" placeholder="City" required/>
                                <select className="quarter-width cursor" onChange={e => setState(e.target.value)} value={state} aria-label="State" required>
                                    <option value="" disabled selected hidden>State</option>
                                    <option>AL</option><option>AK</option><option>AZ</option><option>AR</option>
                                    <option>CA</option><option>CO</option><option>CT</option><option>DE</option>
                                    <option>DC</option><option>FL</option><option>GA</option><option>HI</option>
                                    <option>ID</option><option>IL</option><option>IN</option><option>IA</option>
                                    <option>KS</option><option>KY</option><option>LA</option><option>ME</option>
                                    <option>MD</option><option>MA</option><option>MI</option><option>MN</option>
                                    <option>MS</option><option>MO</option><option>MT</option><option>NE</option>
                                    <option>NV</option><option>NH</option><option>NJ</option><option>NM</option>
                                    <option>NY</option><option>NC</option><option>ND</option><option>OH</option>
                                    <option>OK</option><option>OR</option><option>PA</option><option>RI</option>
                                    <option>SC</option><option>SD</option><option>TN</option><option>TX</option>
                                    <option>UT</option><option>VT</option><option>VA</option><option>WA</option>
                                    <option>WV</option><option>WI</option><option>WY</option>
                                </select>
                            </div>
                            <input className="full-width" onChange={e => setPhone(e.target.value)} value={phone} type="tel" placeholder="Phone Number" required/>
                            <input className="full-width cursor" type="submit" value="Continue"/>
                        </form>
                        :
                        <></>
                        }
                        {formIndex > 1 ?
                        <>
                            <button onClick={() => setFormIndex(1)} className="input-edit button-plain">Edit</button>
                            <div className="user-input">
                                <div>{firstName} {lastName}</div>
                                <div>{addressLine1}</div>
                                <div>{addressLine2}</div>
                                <div>{city}, {state} {zipCode}</div>
                                <div>{country}</div>
                                <div>{phone}</div>
                            </div>
                        </>
                        :
                        <></>
                        }
                    </div>
                    <div className="user-information-box user-payment-container">
                        <h1 className="user-information-header">3. Payment</h1>
                        {formIndex === 2 ?
                        <form onSubmit={(e) => {setFormIndex(3); e.preventDefault();}} className="input-form input-form-payment">
                            <input className="full-width" onChange={e => setNameOnCard(e.target.value)} value={nameOnCard} type="text" placeholder="Name on Card" required/>
                            <input className="full-width" onChange={e => setCardNumber(e.target.value)} value={cardNumber} type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" placeholder="Card Number" required/>
                            <div className="flex">
                                <input className="half-width" onChange={e => setExpiration(e.target.value)} value={expiration} pattern="[0-9, /]{5}" placeholder="MM/YY" required/>
                                <input className="half-width" onChange={e => setCvv(e.target.value)} value={cvv} pattern="[0-9]{3}" placeholder="CVV" required/>
                            </div>
                            <input className="full-width cursor" type="submit" value="Continue"/>
                        </form>
                        :
                        <></>
                        }
                        {formIndex > 2 ?
                        <>
                            <button onClick={() => setFormIndex(2)} className="input-edit button-plain">Edit</button>
                            <div className="user-input">
                                <div>{nameOnCard}</div>
                                <div>{cardNumber}</div>
                                <div>{expiration} {cvv}</div>
                            </div>
                        </>
                        :
                        <></>
                        }
                    </div>
                    <div className="user-information-box user-review-container">
                        <h1 className="user-information-header">4. Review & Purchase</h1>
                        {formIndex === 3 ?
                        <>
                            <div className="user-input">
                                <h3>Email</h3>
                                <div>{email}</div>
                                <br></br>

                                <h3>Shipping</h3>
                                <div id="user-shipping-information">
                                    <div>{firstName} {lastName}</div>
                                    <div>{addressLine1}</div>
                                    <div>{addressLine2}</div>
                                    <div>{city}, {state} {zipCode}</div>
                                    <div>{country}</div>
                                    <div>{phone}</div>
                                </div>
                                <br></br>

                                <h3>Payment</h3>
                                <div id="user-payment-information">
                                    <div>{nameOnCard}</div>
                                    <div>{cardNumber}</div>
                                    <div>{expiration} {cvv}</div>
                                </div>

                            </div>
                            <form className="input-form">
                                <input className="full-width cursor" id="purchase" type="submit" value="Complete Purchase"/>
                            </form>
                        </>
                        :
                        <></>
                        }
                    </div>
                </div>
                <div className="order-summary">
                    <h1>Order Summary</h1>
                    <ul>
                        {cart.map(cartItem => {
                            return <CheckoutItem cartItem={cartItem} />
                        })}
                    </ul>
                    <div className="accounting-line-items">
                        <div className="text-align-left flex">Subtotal: <span id="checkout-subtotal">${subtotal.toFixed(2)}</span></div>
                        <div className="text-align-left flex">Tax: <span id="checkout-tax">${(subtotal * taxRate).toFixed(2)}</span></div>
                        <div className="text-align-left flex">Shipping: <span id="checkout-shipping">FREE</span></div>
                        <strong><div className="text-align-left flex">Grand Total: <span id="checkout-grandtotal">${(subtotal + subtotal * taxRate).toFixed(2)}</span></div></strong>
                    </div>
                </div>
            </main>
        </>
    );
}
