import React from 'react';
import './Home.css'
import WelcomeImage from '../../images/customer_appointment/welcome.jpg';

function Home() {

    return (
        <div>
            <div className='parallax'>
                <div class="centered"><h1>Salon Natural Bridal</h1></div>
            </div>

            <div className='salon_body'>
                <div className='welcome_topic'> <h1>Welcome to Salon Natural Bridal</h1></div>

                <div className='welcome'>

                    <div className='welcome_des'>
                        <p>Welcome to Salon Natural Bridal, where beauty meets nature in the most exquisite way. Step into a realm where elegance, grace,
                            and the essence of your natural beauty intertwine to create the perfect bridal look for your special day.<br></br><br></br>

                            At Salon Natural Bridal, we understand that your wedding day is one of the most significant moments of your life.
                            That's why we're dedicated to crafting a bridal experience that not only enhances your outer radiance
                            but also celebrates the unique beauty that lies within.<br></br><br></br>

                            Our talented team of stylists is committed to bringing your bridal vision to life, whether you're dreaming of a soft,
                            romantic hairstyle adorned with delicate florals or a timeless, classic look that exudes sophistication.
                            Using only the finest natural products and techniques, we'll ensure that you feel confident, empowered,
                            and absolutely radiant as you walk down the aisle.<br></br><br></br>

                            Beyond just creating stunning bridal hairstyles and makeup, Salon Natural Bridal offers a sanctuary
                            of relaxation and rejuvenation. Let go of pre-wedding jitters as you indulge in our tranquil atmosphere,
                            where every moment is dedicated to pampering you and making you feel like the most beautiful bride.<br></br><br></br>

                            Experience the magic of Salon Natural Bridal and embark on a journey to bridal bliss that's as
                            enchanting as it is unforgettable.Your wedding day deserves nothing less than perfection,
                            and with us, you'll shine with the pure, natural beauty that is uniquely yours.

                        </p>

                    </div>

                    <div className='welcome_photo'><img src={WelcomeImage} alt="welcome" /></div>
                </div>

                <div className="about-image">
                    <div className="about-text">
                        <h1>About Us</h1><br></br>

                        <p>Welcome to Salon Natural Bridal, a haven of beauty nestled in the heart of Kuliyapitiya,
                            curated by the visionary owner R.M. Shiromi Malika. With a passion for enhancing natural beauty
                            and a commitment to personalized service,
                            Salon Natural Bridal is more than just a salon; it's a destination where dreams come to life.<br></br><br></br>
                            Founded by R.M. Shiromi Malika,
                            Salon Natural Bridal embodies her belief that every individual possesses a unique radiance that deserves to be celebrated.
                            With years of experience in the beauty industry and a deep understanding of bridal aesthetics, Shiromi Malika has cultivated a
                            space where brides can embark on a transformative journey to discover their most authentic and radiant selves.<br></br><br></br>

                            At Salon Natural Bridal, we take pride in our meticulous attention to detail and unwavering dedication to customer satisfaction.
                            From the moment you step through our doors, you'll be welcomed into a warm and inviting atmosphere, where our team of 
                            skilled professionals will work tirelessly to bring your bridal vision to life.
                            Located in the vibrant city of Kuliyapitiya, Salon Natural Bridal is more than just a salon; it's a sanctuary of beauty and tranquility. 
                            Whether you're seeking the perfect bridal hairstyle, flawless makeup application, or simply a moment 
                            of relaxation amidst the excitement of wedding planning, our talented team is here to exceed your expectations and make your bridal journey truly unforgettable.<br></br><br></br>

                            Experience the magic of Salon Natural Bridal and discover the beauty that lies within. With us, 
                            your wedding day will be a celebration of love, authenticity, and the natural elegance that makes you uniquely beautiful.</p>

                    </div>
                </div>
            </div>



        </div>

    );
}

export default Home;