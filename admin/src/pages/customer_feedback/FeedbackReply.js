import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import the necessary hooks

const FeedBackReply = ({ onReplySubmitted }) => {
    const { id } = useParams(); // Get `id` parameter from URL
    const navigate = useNavigate();
    const [reply, setReply] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReply(value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!reply) {
            alert("Please fill in all fields.");
            return;
        }

        const data = { reply };

        axios.put(`http://localhost:5000/post/update/${id}`, data)
            .then((res) => {
                if (res.data.success) {
                    alert("Feedback updated successfully");
                    navigate(`/feedback_home`);
                }
            })
            .catch((error) => {
                console.error('Error updating feedback:', error);
                alert("Error updating feedback. Please try again.");
            });

    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Reply to customer feedback</h2>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="reply">Reply</label>
                    <textarea
                        className="form-control"
                        id="reply"
                        name="reply"
                        rows="4"
                        placeholder="Write Reply to customer feedback"
                        value={reply}
                        onChange={handleInputChange}
                    ></textarea>
                </div><br />

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default FeedBackReply;
