import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../pages/store/Store.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Store() {

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/product/get", {}).then((response) => {
      var data = response.data;
      setProductData(data);
    });
  },[]);

  const handleProductDetails = () => {
    window.location.href = "/store/productDetails";
  };

  return (

    <>
      {productData.map((result) =>


        <div class="gallery">
          <a
            target="_blank"
            href="C:\Users\User\Desktop\Project1\SalonManagementSystem\client\src\images\Store\3.png"
          >
            <img src={"http://localhost:5000/image/" + result.thumbnail} alt="Store" width="600" height="400" />
          </a>
          <p>{result.product_name}</p>
          <p>Rs {result.price}</p>
          <div class="desc">
            <Link to="/productDetails">
              <button class="button b6" onClick={handleProductDetails}>
                Place Order
              </button>
            </Link>
          </div>
        </div>

      )}

      
    </>

  
  );
}

export default Store;