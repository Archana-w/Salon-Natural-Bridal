import { useEffect, useState } from 'react'
import './Header.css';
import HeaderNavButton from './NavButton';
import HeaderButton from './HeaderButton';
import 'material-icons/iconfont/material-icons.css';
import Logo from '../../images/logo.png';
import ProfileVector from '../../images/default_profile_vector.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthToken, useCurrentUserType } from '../../auth';

function Header() {

    var authToken = useAuthToken();
    var userType = useCurrentUserType();
    const [activePage, setActivePage] = useState(null);
    var location = useLocation();
    var navigate = useNavigate();

    useEffect(function () {
        setActivePage(getPageId(location.pathname));
    });

    function navItemClick(id) {
        navigate(id);
    }

    function onSignUpButtonClick() {
        navigate("/signup"); // This will navigate to the SignUp page when the button is clicked
    }
    function onLoginButtonClick() {
        navigate("/login");// This will navigate to the Login page when the button is clicked
    }
    function onNotificationButtonClick() {
        navigate("/notification");
    }
    function onCartButtonClick() {
        navigate("/cart");
    }
    function onSignOutClick() {
        navigate("/signout");
    }
    function onProfileButtonClick() {
        navigate("/profile");
    }

    return (
        <div className="header">
            <div className="header-top">
                <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="header-right">

                    {(authToken == null) ?
                        (

                            <>
                                <div className='div-btn' id="login" onClick={onLoginButtonClick}>
                                    <button className='signin-button'>Login</button>
                                </div>
                                <div className='div-btn' id="signup" onClick={onSignUpButtonClick}>
                                    <button className='signup-button'>Sign Up</button>
                                </div>
                            </>

                        ) : (

                            <>

                                <div className='div-btn' id="signout" onClick={onSignOutClick}>
                                    <button className='signout-button'>Sign Out</button>
                                </div>
                                <HeaderButton id="notification" activeId={activePage} onClick={onNotificationButtonClick}>
                                    <span className="material-icons-outlined">notifications</span>
                                </HeaderButton>
                                <HeaderButton id="cart" activeId={activePage} onClick={onCartButtonClick}>
                                    <span className="material-icons-outlined">shopping_bag</span>
                                </HeaderButton>

                                <div className="profile" onClick={onProfileButtonClick}>
                                    <div className="profile-picture">
                                        <img src={ProfileVector} />
                                    </div>
                                </div>
                            </>

                        )}

                </div>
            </div>
            <div className="header-nav">

                <HeaderNavButton id="" activeId={activePage} name="Home" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="create-app" activeId={activePage} name="Create Appoinment" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="my-app" activeId={activePage} name="My Appoinments" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="service" activeId={activePage} name="Our Service" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="store" activeId={activePage} name="Our Store" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="contact" activeId={activePage} name="Contact Us" onClick={(id) => { navItemClick(id) }} />
                
                {(userType != null & userType == "employee")?(
                    <HeaderNavButton id="leave" activeId={activePage} name="Leave" onClick={(id) => { navItemClick(id) }} />
                ):("")}

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