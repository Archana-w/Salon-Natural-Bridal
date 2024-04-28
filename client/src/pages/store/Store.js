import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../pages/store/Store.css";
import axios from "axios";
import { useAuthToken } from '../../auth';
import Link from "antd/es/typography/Link";
import pic1 from "../../images/Store/hair.png"; 
import pic2 from "../../images/Store/skin.png";
import pic3 from "../../images/Store/lips.png"; 
import pic4 from "../../images/Store/nail.png";
import pic5 from "../../images/Store/eye.png"; 

function Store() {

  const [productData, setProductData] = useState([]);
  var token = useAuthToken();
 
   const handleProductDetails = () => {
     window.location.href = '/store/ProductDetails';
   };

  useEffect(() => {

    axios.post("http://localhost:5000/product/get", {}).then((response) => {
      var data = response.data;
      setProductData(data);
    });

  },[]);

  function handleProduct() {
    addCart()
    //handleProductDetails();
}
  //implement by savindu
  function addCart(productId){
    
    axios.post("http://localhost:5000/cart/add", { token:token, product_id: productId, quantity:1}).then((response)=>{
      var data = response.data;
      alert(JSON.stringify(data));
    }).catch((error)=>{
      alert(error);
    });
  
  }

  return (

    <>

<div>
            <div className='scroll'>
                <div class="topicS"><h1>Salon Natural Bridal</h1></div> 
            </div>

            <div class="tpc"><h1>Welcome to our salon store</h1></div>


            <div class="types">
              <div class="circle" id="circle">
              <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/hair.png">
                  <img src={pic1} alt="hair" />
              </a>
              <p class="category">HAIR</p>
              </div>

              <div class="circle" id="circle">
              <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/skin.png">
                  <img src={pic2} alt="skin" />
              </a>
              <p class="category">SKIN</p>
              </div>

              <div class="circle" id="circle">
              <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/lips.png">
                  <img src={pic3} alt="lips" />
              </a>
              <p class="category">LIPS</p>
              </div>

              <div class="circle" id="circle">
              <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/nail.png">
                  <img src={pic4} alt="nail" />
              </a>
              <p class="category">NAIL</p>
              </div>

              <div class="circle" id="circle">
              <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/eye.png">
                  <img src={pic5} alt="eye" />
              </a>
              <p class="category">EYE</p>
              </div>
           </div>
           <div class="store">
</div>
             
           
         
      {productData.map((result) =>

        <div key={result._id} className="gallery">
          <img src={"http://localhost:5000/image/" + result.thumbnail} alt="Store" width="600" height="400" />
          <p>{result.product_name}</p>
          <p>Rs .{result.price}</p>
          <div className="desc">
            <button class="button b6" onClick={(handleProduct)}>Place Order</button>
 
             
          </div>
          
        </div>

      )} 

</div>    
    </> 
 
);

}

export default Store;