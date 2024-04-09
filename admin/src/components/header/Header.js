import { useEffect, useState } from 'react'
import './Header.css';
import logosalon from '../../images/logo.png'


function Header() {


  return (


    <div className='header'>
      <header>

        <div className='headerLogo'>
          <img src={logosalon} alt='logo' className='logosalon' />
        </div>

        <div className='headerDes'>

          Welcome to Admin Dashboard

        </div>
      </header>

    </div>




  );
}

export default Header;