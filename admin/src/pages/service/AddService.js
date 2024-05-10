import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddService() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [priceError, setPriceError] = useState("");
  
  function sentData(data) {
    const formData = new FormData();
    formData.append("sName", data.sName);
    formData.append("sPrice", data.sPrice);
    formData.append("sDescription", data.sDescription);
    formData.append("sType", data.sType);
    formData.append("image", data.image[0]); 
  
    axios.post("http://localhost:5000/service/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        alert("Service added");
        reset(); // Reset the form after successfully adding the service
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error); // Display error message from the server
        } else {
          console.error("Error:", err); // Log the full error for debugging
          alert("An error occurred while adding the service.");
        }
      });
  }

  function onSubmit(data) {
    sentData(data);
  }

  function handlePriceChange(event) {
    const value = event.target.value;
    if (!isNumeric(value)) {
      setPriceError("Price must be a number");
    } else {
      setPriceError("");
    }
  }

  function isNumeric(value) {
    return /^[0-9]+$/.test(value); // Regex to check if the value is numeric
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <br />
          <div className="mb-1">
            <label htmlFor="disabledSelect" className="form-label">Service Type</label><br />
            <select id="disabledSelect" className="form-select" {...register("sType", { required: "Service Type is required" })}>
              <option value="">Select one</option>
              <option value="Hair care">Hair care</option>
              <option value="Skin care">Skin care</option>
              <option value="Nail care">Nail care</option>
            </select>
            {errors.sType && <span className="text-danger">{errors.sType.message}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="disabledTextInput1" className="form-label">Service Name</label>
            <input type="text" id="disabledTextInput1" className="form-control" placeholder="Enter service Name"
              {...register("sName", { required: "Service Name is required" })} />
            {errors.sName && <span className="text-danger">{errors.sName.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="disabledTextInput2" className="form-label">Price</label>
            <input type="text" id="disabledTextInput2" className="form-control" placeholder="Enter price"
              {...register("sPrice", { required: "Price is required" })} onChange={handlePriceChange} />
            {priceError && <span className="text-danger">{priceError}</span>}
            {errors.sPrice && <span className="text-danger">{errors.sPrice.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" id="image" className="form-control" {...register("image", { required: "Image is required" })} />
            {errors.image && <span className="text-danger">{errors.image.message}</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="disabledTextInput4" className="form-label">Description</label>
            <textarea type="text" id="disabledTextInput4" className="form-control" placeholder="Enter description"
              {...register("sDescription", { required: "Description is required" })} style={{ height: '100px' }} />
            {errors.sDescription && <span className="text-danger">{errors.sDescription.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ margin: "0 auto", display: "block", width: "300px" }}>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddService;
