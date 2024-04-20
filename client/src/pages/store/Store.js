import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../pages/store/Store.css";
import axios from "axios";
import { useAuthToken } from '../../auth';

function Store() {

  const [productData, setProductData] = useState([]);
  var token = useAuthToken();

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

  return (

    <>
      {productData.map((result) =>

        <div key={result._id} className="gallery">
          <img src={"http://localhost:5000/image/" + result.thumbnail} alt="Store" width="600" height="400" />
          <p>{result.product_name}</p>
          <p>Rs {result.price}</p>
          <div className="desc">
            <button className="button b6" onClick={() => addCart(result._id)}>
              Place Order
            </button>
          </div>
        </div>

      )}

      
    </>

  
  );
}

export default Store;