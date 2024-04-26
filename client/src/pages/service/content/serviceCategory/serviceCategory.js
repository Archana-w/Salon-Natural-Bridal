import React from 'react';
import './serviceCategory.css';
import skin from '../../../../images/service/skin.jpeg';
import hair from '../../../../images/service/hair.jpg';
import nail from '../../../../images/service/nail.jpg';
import { Link } from 'react-router-dom';

function serviceCategory() {
  return (
    <div className="categories-container">
      <h1 className="title">Categories</h1>
      <p className="subtitle">See all the listing Categories from here</p>
      <div className="categories-list">
        <div className="category-item">
            <div className="category-image">
                <Link to='/Nail_care'><img src={nail} alt="nail care" /></Link>
            </div>
            <p className="category-name">Nail care</p>
        </div>
        <div className="category-item">
            <div className="category-image">
                <Link to='/Hair_care'><img src={hair} alt="hair care" /></Link>
            </div>
            <p className="category-name">Hair care</p>
        </div>
        <div className="category-item">
            <div className="category-image">
                <Link to='/Skin_care'><img src={skin} alt="skin care" /></Link>
            </div>
            <p className="category-name">Skin Care Treatments</p>
        </div>
      </div>
        <div className="service_title">
            <h2>Skin Care</h2>
        </div>
        <div className="service_image">
            <img src={skin} alt="skin care" />
            <div className="description">
                <p>Haircare or haircare is an overall term for hygiene and cosmetology involving the hair which grows from the human scalp, and to a lesser extent facial, pubic and other body hair. Hair care routines differ according to an individual's culture and the physical characteristics of one's hair.</p>
            </div>
        </div>
        <div className="service_title">
            <h2>Skin Care</h2>
        </div>
        <div className="service_image">
            <img src={hair} alt="hair care" />
            <div className="description">
                <p>Haircare or haircare is an overall term for hygiene and cosmetology involving the hair which grows from the human scalp, and to a lesser extent facial, pubic and other body hair. Hair care routines differ according to an individual's culture and the physical characteristics of one's hair.</p>
            </div>
        </div>
        <div className="service_title">
            <h2>Skin Care</h2>
        </div>
        <div className="service_image">
            <img src={nail} alt="nail care" />
            <div className="description">
                <p>Haircare or haircare is an overall term for hygiene and cosmetology involving the hair which grows from the human scalp, and to a lesser extent facial, pubic and other body hair. Hair care routines differ according to an individual's culture and the physical characteristics of one's hair.</p>
            </div>
        </div>
      
    </div>
  );
}

export default serviceCategory;
