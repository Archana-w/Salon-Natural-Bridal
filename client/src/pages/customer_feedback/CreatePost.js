import React, { Component } from 'react';
import axios from 'axios';
import RatingSelect from './RatingSelect';
import Feed_Card from './shared/Feed_Card';
import './CreatePost.css';


export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            service: "",
            review: "",
            rating: ""
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleRatingChange = (rating) => {
        this.setState({
            rating
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { name, phone, email, service, review, rating } = this.state;

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

        axios.post("http://localhost:5000/post/save", data)
            .then((res) => {
                if (res.data.success) {
                alert("Feedback submitted successfully");
                this.setState({
                    name: "",
                    phone: "",
                    email: "",
                    service: "",
                    review: "",
                    rating: ""
                });
                } else {
                alert("Submission failed. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error submitting feedback:", error);
                alert("Error submitting feedback. Please try again.");
            });

    };

    render() {
        return (
            <div className='createfeedform'>
                <Feed_Card>
                    <form className="createfeedpost" onSubmit={this.onSubmit}>
                        <h2 className='createfeedpost_header'>How would you rate your service with us?</h2>
                        <RatingSelect select={this.handleRatingChange} selected={this.state.rating} />
                        
                        <div className="createfeedpost_input_group">
                            <input 
                                className='createfeed_input'
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </div><br />

                        <div className="createfeedpost_input_group">
                            <input
                                className='createfeed_input'
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone number"
                                value={this.state.phone}
                                onChange={this.handleInputChange}
                            />
                        </div><br />

                        <div className="createfeedpost_input_group">
                            <input
                                className='createfeed_input'
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </div><br />

                        <div className="createfeedpost_input_group">
                            <select className='createfeedpost_input_group_dropdown'
                                type="text"
                                id="service"
                                name="service"
                                placeholder="Enter the service"
                                value={this.state.service}
                                onChange={this.handleInputChange}
                            >
                                <option className='selectbtn' value='' disabled>Select a service</option>
                                <option value='Hair Care'>Hair Care</option>
                                <option value='Skin Care'>Skin Care</option>
                                <option value='Nail Care'>Nail Care</option>
                            </select>
                        </div><br />

                        <div className="createfeedpost_input_group">
                            <textarea
                                className="createfeedpost_input_group_dropdown_txtarea"
                                id="review"
                                name="review"
                                rows="4"
                                placeholder="Write your review"
                                value={this.state.review}
                                onChange={this.handleInputChange}
                            ></textarea>
                        </div><br />

                        <br /> 

                        <button type="submit" className="btnpostsubmit">Submit</button>
                    </form>
                </Feed_Card>
            </div>
        );
    }
}
