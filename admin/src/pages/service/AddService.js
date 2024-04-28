import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./AddService.css"; // Import the CSS file

function AddService() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [priceError, setPriceError] = useState("");

  function sentData(data) {
    axios.post("http://localhost:5000/service/add", data)
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
          <div className="mb-1">
            <label htmlFor="sType" className="form-label">Service Type</label>
            <select id="sType" className="form-select" {...register("sType", { required: "Service Type is required" })}>
              <option value="">Select one</option>
              <option value="Hair care">Hair care</option>
              <option value="Skin care">Skin care</option>
              <option value="Nail care">Nail care</option>
            </select>
            {errors.sType && <span className="text-danger">{errors.sType.message}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="sName" className="form-label">Service Name</label>
            <input type="text" id="sName" className="form-control" placeholder="Enter service Name"
              {...register("sName", { required: "Service Name is required" })} />
            {errors.sName && <span className="text-danger">{errors.sName.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="sPrice" className="form-label">Price</label>
            <input type="text" id="sPrice" className="form-control" placeholder="Enter price"
              {...register("sPrice", { required: "Price is required" })} onChange={handlePriceChange} />
            {priceError && <span className="text-danger">{priceError}</span>}
            {errors.sPrice && <span className="text-danger">{errors.sPrice.message}</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="sDescription" className="form-label">Description</label>
            <textarea type="text" id="sDescription" className="form-control" placeholder="Enter description"
              {...register("sDescription", { required: "Description is required" })} style={{ height: '100px' }} />
            {errors.sDescription && <span className="text-danger">{errors.sDescription.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddService;
