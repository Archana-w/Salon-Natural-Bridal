import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddService() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null); 

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function sentData(data) {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("sType", data.sType);
    formData.append("sName", data.sName);
    formData.append("sPrice", data.sPrice);
    formData.append("sEmpName", data.sEmpName);
    formData.append("sDescription", data.sDescription);

    axios.post("http://localhost:5000/service/sentData", formData, {
      headers: {
        "Content-Type": "multipart/form-data" // Set content type as multipart/form-data
      }
    })
      .then(() => {
        alert("Service added");
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit(sentData)}>
        <fieldset>
          <br></br>
          <div className="mb-1">
            <div>
            <label htmlFor="disabledSelect" className="form-label">Service Type</label><br></br>
            </div>
            <div>
            <select id="disabledSelect" className="form-select" {...register("sType", { required: "Service Type is required" })}>
              <option value="">Select one</option>
              <option value="Hair care">Hair care</option>
              <option value="Skin care">Skin care</option>
              <option value="Nail care">Nail care</option>
            </select>
            </div>
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
              {...register("sPrice", { required: "Price is required" })} />
            {errors.sPrice && <span className="text-danger">{errors.sPrice.message}</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="disabledTextInput4" className="form-label">Description</label>
            <textarea type="text" id="disabledTextInput4" className="form-control" placeholder="Enter description"
              {...register("sDescription", { required: "Description is required" })} style={{ height: '100px' }} />
            {errors.sDescription && <span className="text-danger">{errors.sDescription.message}</span>}
          </div>
          {/* Input for image file */}
          <div className="mb-6">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="form-control"
              {...register("image", {
                required: "Image is required",
                validate: (value) => value && value[0] && value[0].size <= 5000000 // 5MB in bytes
              })}
            />
            {errors.image && <span className="text-danger">{errors.image.message}</span>}
            {errors.image?.type === "validate" && <span className="text-danger">Image size must be less than 5MB</span>}
            {errors.image?.type === "required" && <span className="text-danger">Image is required</span>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ margin: "0 auto", display: "block", width: "300px" }}>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddService;
