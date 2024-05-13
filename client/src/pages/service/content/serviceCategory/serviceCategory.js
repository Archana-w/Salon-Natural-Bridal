import React from 'react';
import './serviceCategory.css';
import skin from '../../../../images/service/service_skin.png';
import hair from '../../../../images/service/service_hair.jpg';
import nail from '../../../../images/service/nail.jpg';
import haird from '../../../../images/service/service_hair_d.jpg';
import naild from '../../../../images/service/service_nail_d.jpg';

import { Link } from 'react-router-dom';

function serviceCategory() {
  return (
    <div className="service_categories_container">
      <h1 className="service_ca_title">Categories</h1>
      <p className="service_subtitle">See all the listing Categories from here</p>
      <div className="service_categories-list">
        <div className="service_category-item">
            <div className="category-image1">
                <Link to='/Nail_care'><img className='service_category-image1' src={nail} alt="nail care" /></Link>
            </div>
            <p className="service_category_name">Nail care</p>
        </div>
        <div className="service_category-item">
            <div className="category-image1">
                <Link to='/Hair_care'><img className='service_category-image1' src={hair} alt="hair care" /></Link>
            </div>
            <p className="service_category_name">Hair care</p>
        </div>
        <div className="service_category-item">
            <div className="category-image1">
                <Link to='/Skin_care'><img className='service_category-image1' src={skin} alt="skin care" /></Link>
            </div>
            <p className="service_category_name">Skin Care</p>
        </div>
      </div>
        <div className="service_title2">
            <h2>Skin Care</h2>
        </div>
        <div className="service_image_d">
            <img className='service_image_img1' src={skin} alt="skin care" />
            <div className="service_description">
                <p className='service_desc'>Skin care is more than a routine; it's a commitment to nurturing your body's largest organ for a radiant, healthy glow. Begin with gentle cleansing to remove dirt, oil, and impurities without stripping away natural oils. Follow with a hydrating toner to rebalance pH levels and prepare skin for optimal absorption of treatments. Incorporate serums containing potent antioxidants like vitamin C to protect against environmental damage and promote collagen production for firm, youthful skin. Moisturize daily with a lightweight lotion or cream to lock in hydration and maintain skin's elasticity. Don't forget sunscreen; UV protection is essential year-round to prevent premature aging and reduce the risk of skin cancer. Treat yourself to weekly exfoliation......</p>
            </div>
        </div>
        <div className="service_title2">
            <h2>Hair Care</h2>
        </div>
        <div className="service_image_d">
            <img className='service_image_img2' src={haird} alt="hair care" />
            <div className="service_description">
                <p className='service_desc'>Maintaining luscious locks requires more than just shampoo and conditioner; it's about nurturing your hair with care and attention. Effective hair care begins with understanding your hair type and selecting products tailored to its needs. Whether your hair is straight, curly, wavy, or coily, a proper routine involves cleansing, conditioning, and occasional treatments to keep it healthy and vibrant. Regular trimming helps prevent split ends, while protecting your hair from heat damage with serums or sprays is crucial. Additionally, incorporating natural oils like coconut or argan oil can nourish and moisturize your strands, promoting growth and shine. Remember, a balanced diet rich in vitamins and minerals also contributes to strong, resilient hair.....</p>
            </div>
        </div>
        <div className="service_title2">
            <h2>Nail Care</h2>
        </div>
        <div className="service_image_d">
            <img className='service_image_img3' src={naild} alt="nail care" />
            <div className="service_description">
                <p className='service_desc'>Nail care is more than just a beauty regimen; it's a reflection of overall health and hygiene. Start by keeping nails clean and trimmed to prevent dirt and bacteria buildup. Regularly moisturize cuticles to maintain their health and prevent painful hangnails. Choose quality nail polishes and strengtheners to shield nails from damage and promote growth. When applying polish, use a base coat to prevent staining and a top coat for long-lasting shine. Avoid harsh chemicals and excessive filing, as these can weaken nails over time. If you're prone to nail biting or picking, consider using a bitter-tasting deterrent or seeking professional help to break the habit. Lastly, a balanced diet rich in nutrients like biotin and calcium supports strong, resili.....</p>
            </div>
        </div>
      
    </div>
  );
}

export default serviceCategory;
