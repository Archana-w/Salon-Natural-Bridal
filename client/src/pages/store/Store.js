import React, { useState } from 'react'
import '../../App.css'
import '../../pages/store/Store.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
  
 
import pic3 from '../../images/Store/3.png'
import pic6 from '../../images/Store/6.png'
import pic8 from '../../images/Store/8.png'
import pic9 from '../../images/Store/9.png'
import pic14 from '../../images/Store/14.png'
import pic15 from '../../images/Store/15.png'
import pic16 from '../../images/Store/16.png'
import pic20 from '../../images/Store/20.png'
import pic23 from '../../images/Store/23.png' 
import pic24 from '../../images/Store/24.png'
import pic26 from '../../images/Store/26.png'
import pic27 from '../../images/Store/27.png'
import pic28 from '../../images/Store/28.png'
import pic25 from '../../images/Store/25.png'
import pic30 from '../../images/Store/31.png'
  import pic34 from '../../images/Store/hair.png'
 import pic35 from '../../images/Store/skin.png'
 import pic36 from '../../images/Store/lips.png'

  

function Store () { 

  
 
 
   const handleProductDetails = () => {
     window.location.href = '/store/productDetails';
   };
    
    return (
      
  <body>

  
<div class ="Search">
     <input type="text" placeholder="Search.." id="myInput" />
      
 </div> 
 <br></br> <br></br>

 <div class="dv1">
  <div class="roundicon">
   <a href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\skin.png">
    <img src={pic34} alt="Store" width="64" height="64"/>
  </a>
   </div>

   <div class="roundicon">
   <a href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\hair.png">
    <img src={pic35} alt="Store" width="64" height="64"/>
  </a>
   </div>

   <div class="roundicon">
   <a href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\lips.png">
    <img src={pic36} alt="Store" width="64" height="64"/>
  </a>
   </div>
 </div>
<br></br><br></br><br></br><br></br>
<br></br><br></br>

<hr></hr>

  <h1>Skin Care Products</h1>

 <div class="gallery">
   <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\3.png">
    <img src={pic3} alt="Store" width="600" height="400"/>
  </a>
  <p>Facial Wash</p>
  <p>Rs.650</p>
  <div class="desc"> 
  <Link to="/productDetails">
  <button class="button b6" onClick={handleProductDetails}>Place Order</button>
  </Link>
  </div>
   
  </div>
 
 <div class="gallery">
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\26.png">
    <img src={pic26} alt="Store" width="600" height="400"/>
  </a>
  <p>Facial Scrub</p>
  <p>Rs.2950</p>
  <div class="desc"> 
  <button class="button b7">Place Order</button>
  </div>
</div>

<div class="gallery">
<br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\23.png">
    <img src={pic23} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Gold Face Mask</p>
  <p>Rs.900</p>
  <div class="desc"> 
  <button class="button b8">Place Order</button>
  </div>
</div>

<div class="gallery">
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\20.png">
    <img src={pic20} alt="Store" width="600" height="400"/>
  </a>
  <p>Specialist Toner</p>
  <p>Rs.3600</p>
  <div class="desc"> 
  <button class="button b9">Place Order</button>
  </div>
</div>
 
<div class="gallery">
<br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\24.png">
    <img src={pic24} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Face Mask & Face Pack</p>
  <p>Rs.1850</p>
  <div class="desc"> 
  <button class="button b10">Place Order</button>
  </div>
</div>

<div class="gallery">
<br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\25.png">
    <img src={pic25} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Face & Body Scrub</p>
  <p>Rs.1650</p>
  <div class="desc"> 
  <button class="button b11">Place Order</button>
  </div>
</div>
<br></br>
<br></br>
<h1>Hair Care Products</h1>

<div class="gallery">
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\14.png">
    <img src={pic14} alt="Store" width="200" height="300"/>
  </a>
  <p>Anti-Dandruff Shampoo</p>
  <p>Rs.690</p>
  <div class="desc"> 
  <button class="button b1 ">Place Order</button>
  </div>
  </div>

 <div class="gallery">
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\15.png">
    <img src={pic15} alt="Store" width="600" height="400"/>
  </a>
  <p>Color Rescue Shampoo</p>
  <p>Rs.790</p>
   <div class="desc"> 
  <button class="button b16">Place Order</button>
  </div>
 </div>

<div class="gallery">
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\16.png">
    <img src={pic16} alt="Store" width="600" height="400"/>
  </a>
  <p>Keratin Shampoo</p>
  <p>Rs.630</p>  <div class="desc"> 
  <button class="button b2">Place Order</button>
  </div>
</div>

<div class="gallery">
<br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\6.png"> 
    <img src={pic6} alt="Store" width="600" height="200"/>
  </a>
  <br></br><br></br>
  <p>Hair Serum</p>
  <p>Rs.650</p>
  <div class="desc"> 
  <button class="button b3">Place Order</button>
  </div>
  </div>
 
<div class="gallery">
<br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\8.png">
    <img src={pic8} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Hair Straightener Cream</p>
  <p>Rs.1800</p>
  <div class="desc"> 
  <button class="button b4">Place Order</button>
  </div>
</div>

<div class="gallery">
  <br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\9.png">
    <img src={pic9} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Hair Gel</p>
  <p>Rs.3500</p>
  <div class="desc"> 
  <button class="button b5">Place Order</button>
  </div>
</div>

<br></br><br></br>
 <h1>Lips Care Products</h1>


<div class="gallery">
   <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\27.png">
    <img src={pic27} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Lip Balm</p>
  <p>Rs.1480</p>
  <div class="desc"> 
  <button class="button b12">Place Order</button>
  </div>
</div>

 <div class="gallery">
 <br></br><br></br>
  <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\28.png">
    <img src={pic28} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Vseline Lip Balm</p>
  <p>Rs.300</p>
  <div class="desc"> 
  <button class="button b13">Place Order</button>
  </div>
</div>

 

<div class="gallery">
   <a target="_blank" href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\31.png">
    <img src={pic30} alt="Store" width="600" height="400"/>
  </a>
  <br></br><br></br>
  <p>Lipstick</p>
  <p>Rs.1000</p>
    <div class="desc"> 
  <button class="button b14">Place Order</button>
  </div>
</div>



 
 

</body>
  
 
);
}

    

    export default Store;
