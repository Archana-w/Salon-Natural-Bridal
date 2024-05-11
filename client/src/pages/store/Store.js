import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../pages/store/Store.css";
import axios from "axios";
import { useAuthToken } from '../../auth';
import Link from "antd/es/typography/Link";
import pic6 from "../../images/Store/1.png";
import pic7 from "../../images/Store/2.png";
import pic8 from "../../images/Store/3.png";
import pic9 from "../../images/Store/4.png";
import pic10 from "../../images/Store/5.png";
import pic11 from "../../images/Store/6.png";
import pic12 from "../../images/Store/7.png";
import pic13 from "../../images/Store/8.png";

function Store() {

  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
 
  //implement by savindu
  function addCart(productId){
    
    axios.post("http://localhost:5000/cart/add", { token:token, product_id: productId, quantity:1}).then((response)=>{
      var data = response.data;
      alert(JSON.stringify(data));
    }).catch((error)=>{
      alert(error);
    });
  
  }

  

  function handleSearch() {
    // Implement search logic here
    // For example, filter productData based on searchQuery
    const filteredProducts = productData.filter(product => 
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProductData(filteredProducts);
  }

  return (

    <>

<div>
            <div className='scroll'>
                <div class="topicS"><h1>Salon Natural Bridal</h1></div> 
            </div>


           <div class="store">

           <div class="StoreSearch">
          <input type="text" class="sSearch" placeholder="Search products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button class="Sbutton" onClick={handleSearch}>Search</button>
        </div>
</div>
             
       <div class ="Storegallery">   

       <div class= "STtopic">
         <h1>Our Products</h1>
         </div>
      {productData.map((result) =>
        
        <div key={result._id} className="gallery">
        <div class="Spic">
          <img src={"http://localhost:5000/image/" + result.thumbnail} alt="Store" width="600" height="400" />
          </div>
          <div class="Sdetails">
          <p>{result.product_name}</p>
          <p>Rs .{result.price}</p>
          </div>
          <div class="PaceBtn">
            <button class="button b6" onClick={() => addCart(result._id)}>Place Order</button>
          </div>
          
        </div>

      )} 
      </div>
      <div class = "bannerS">
      <div class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/1.png">
                  <img src={pic6} alt="1" width={320} height={320}/>
          </a>
               
      </div>

      <div class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/3.png">
                  <img src={pic7} alt="1" width={320} height={320}/>
          </a>
               
      </div>

      <div  class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/4.png">
                  <img src={pic8} alt="1" width={320} height={320}/>
          </a>
               
      </div>
      <div class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/5.png">
                  <img src={pic9} alt="1" width={320} height={320}/>
          </a>
               
      </div>

      <div class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/6.png">
                  <img src={pic10} alt="1" width={320} height={320}/>
          </a>
               
      </div>

      <div class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/7.png">
                  <img src={pic11} alt="1" width={320} height={320}/>
          </a>
               
      </div>

      <div  class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/8.png">
                  <img src={pic12} alt="1" width={320} height={320}/>
          </a>
               
      </div>
      <div class = "ImgSqure">
          <a href="C:\Users\Udeshika Balasooriya\Desktop\Salon\Salon-Natural-Bridal\client\src\images\Store/9.png">
                  <img src={pic13} alt="1" width={320} height={320}/>
          </a>
               
      </div>

       
      </div>

      

</div>  
  
    </> 
    
 
);

}

export default Store;