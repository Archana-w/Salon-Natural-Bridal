import { useEffect, useState } from 'react'
import './Header.css';
import HeaderNavButton from './NavButton';
import HeaderButton from './HeaderButton';
import 'material-icons/iconfont/material-icons.css';
import Logo from '../../images/logo.png';
import ProfileVector from '../../images/default_profile_vector.webp';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {

    const [activePage, setActivePage] = useState(null);
    var location = useLocation();
    var navigate = useNavigate();

    useEffect(function () {
        setActivePage(getPageId(location.pathname));
    });

    function navItemClick(id) {
        navigate(id);
    }

    function onCartButtonClick() {
        navigate("signup");
    }
    function onSignUpButtonClick() {
        navigate("login");
    }
    function onLoginButtonClick() {
        navigate("notification");
    }
    function onProfileButtonClick() {
        navigate("cart");
    }
    return (
        <div className="header">
            <div className="header-top">
                <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="header-right">

                    <div className='div-btn'id="signup" activeId={activePage} onClick={onSignUpButtonClick}>
                        <button className='signup-button'>Sign Up</button>
                    </div>
                    <div className='div-btn' id="login" activeId={activePage} onClick={onLoginButtonClick}>
                        <button className='signup-button'>Login</button>
                    </div>
                    <HeaderButton id="notification" activeId={activePage} onClick={onCartButtonClick}>
                        <span className="material-icons-outlined">notifications</span>
                    </HeaderButton>
                    <HeaderButton id="cart" activeId={activePage} onClick={onProfileButtonClick}>
                        <span className="material-icons-outlined">shopping_bag</span>
                    </HeaderButton>

                    <div className="profile">
                        <div className="profile-picture">
                            <img src={ProfileVector} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="header-nav">

                <HeaderNavButton id="" activeId={activePage} name="Home" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="create-app" activeId={activePage} name="Create Appoinment" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="store" activeId={activePage} name="Our Store" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="about" activeId={activePage} name="About Us" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="contact" activeId={activePage} name="Contact Us" onClick={(id) => { navItemClick(id) }} />

            </div>
        </div>
    );
}

function getPageId(path) {
    path = path.substring(1, path.length);
    const firstIndex = path.indexOf("/");
    if (firstIndex == -1) {
        return path;
    } else {
        return path.substring(0, firstIndex);
    }
}

export default Header;