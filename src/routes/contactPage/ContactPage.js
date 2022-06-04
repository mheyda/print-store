import './ContactPage.css';
import BannerHeader from '../../components/bannerHeader/BannerHeader.js';


export default function ContactPage() {

  return (
    <>
        <BannerHeader title={'CONTACT'} buttonContent={'Send a Message'} href={'#contact'} imgSrc={'assets/images/banners/banner 4.jpg'} imgAlt={'Header Background of Rocky Mountain National Park'} />
        <main id='contact'>
            <form id="contact-form" onSubmit={() => alert('Your message has been sent!')}>
                <p>*All Fields Required</p>
                <br></br>
                <br></br>
                <div className="flex">
                    <label for="contact-first-name" className="half-width">First Name<br></br><input id="contact-first-name" className="full-width" type="text" required/></label>
                    <label for="contact-last-name" className="half-width">Last Name<br></br><input id="contact-last-name" className="full-width" type="text" required/></label>
                </div>
                <br></br>
                <div class="flex">
                    <label for="contact-email" className="full-width">Email Address<br></br><input id="contact-email" className="full-width" type="email" required/></label>
                </div>
                <br></br>
                <div class="flex">
                    <label for="contact-subject" className="full-width">Subject<br></br><input id="contact-subject" className="full-width" type="text" required/></label>
                </div>
                <br></br>
                <div class="flex">
                    <label for="contact-message" className="full-width">Message<br></br><textarea id="contact-message" className="full-width" type="text" required></textarea></label>
                </div>
                <br></br>
                <div class="text-align-center">
                    <input id="contact-submit" className="cursor quarter-width" type="submit" aria-label="Submit"/>
                </div>
            </form>    
        </main>
    </>
  );
}

