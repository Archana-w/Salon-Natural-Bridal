import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Feed_Card from './shared/Feed_Card';
import RatingSelect from './RatingSelect';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        review: "",
        rating: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            console.error("No ID found in URL params");
            setError("No ID found in URL params");
            return;
        }

        
        axios.get(`http://localhost:5000/post/${id}`)
            .then((res) => {
                const postData = res.data.post;
                setFormData({
                    name: postData.name,
                    phone: postData.phone,
                    email: postData.email,
                    service: postData.service,
                    review: postData.review,
                    rating: postData.rating
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
                setError("Error fetching post data.");
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRatingChange = (rating) => {
        setFormData((prevState) => ({
            ...prevState,
            rating
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, phone, email, service, review, rating } = formData;

        if (!name || !phone || !email || !service || !review) {
            alert("Please fill in all fields.");
            return;
        }

        if (phone.trim().length !== 10) {
            alert("Phone number must be exactly 10 digits");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const data = {
            name,
            phone,
            email,
            service,
            review,
            rating
        };

        axios.put(`http://localhost:5000/post/update/${id}`, data)
            .then((res) => {
                if (res.data.success) {
                    alert("Feedback updated successfully");
                    navigate(`/contact`);
                }
            })
            .catch((error) => {
                console.error('Error updating feedback:', error);
                alert("Error updating feedback. Please try again.");
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='createfeedform'>
            <Feed_Card>
            
            <form className="createfeedpost" onSubmit={onSubmit}>
            <h2 className="createfeedpost_header">Edit Feedback</h2>
            <RatingSelect select={handleRatingChange} selected={formData.rating} />
                <div className="createfeedpost_input_group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="createfeed_input"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div><br />

                <div className="createfeedpost_input_group">
                    <label htmlFor="phone">Phone no.</label>
                    <input
                        type="text"
                        className="createfeed_input"
                        id="phone"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div><br />

                <div className="createfeedpost_input_group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="createfeed_input"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div><br />

                <div className="createfeedpost_input_group">
                <label htmlFor="email">Service</label>
                    <select
                        type="text"
                        className="createfeedpost_input_group_dropdown"
                        id="service"
                        name="service"
                        placeholder="Enter the service you took"
                        value={formData.service}
                        onChange={handleInputChange}
                    >
                        <option value='Hair Care'>Hair Care</option>
                        <option value='Skin Care'>Skin Care</option>
                        <option value='Nail Care'>Nail Care</option>
                    </select>
                </div><br />
 
               

                <div className="createfeedpost_input_group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        className="createfeedpost_input_group_dropdown_txtarea"
                        id="review"
                        name="review"
                        rows="4"
                        placeholder="Write your review"
                        value={formData.review}
                        onChange={handleInputChange}
                    ></textarea>
                </div><br />

                <button type="submit" className="btnpostsubmit">Submit</button>
            </form>
            </Feed_Card>
        </div>
    );
};

export default EditPost;

