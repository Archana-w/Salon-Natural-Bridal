import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetails.css';

const PostDetails = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/post/${id}`).then((res) => {
            if (res.data.success) {
                setPost(res.data.post);
                console.log(post);
            }
        });
    }, [id]);

    const { name, phone, email, service, review, rating, reply } = post;

    return (
        <div style={{ margin: '20px' }}>
            <h4>{service}</h4>
            <hr/> 

            <dl className="feed_ad_fd_row">
                <dt className="feed_ad_fd_col_sm_3">Rating</dt>
                <dd className="feed_ad_fd_col_sm_9">{rating}</dd>

                <dt className="feed_ad_fd_col_sm_3">Name</dt>
                <dd className="feed_ad_fd_col_sm_9">{name}</dd>

                <dt className="feed_ad_fd_col_sm_3">Phone</dt>
                <dd className="feed_ad_fd_col_sm_9">{phone}</dd>

                <dt className="feed_ad_fd_col_sm_3">Email</dt>
                <dd className="feed_ad_fd_col_sm_9">{email}</dd>

                <dt className="feed_ad_fd_col_sm_3">Review</dt>
                <dd className="feed_ad_fd_col_sm_9">{review}</dd><br/><br/>

                
                <dt className="feed_ad_fd_col_sm_3"><h5>Answer</h5></dt>
                <dd className="feed_ad_fd_col_sm_9"><h5>{reply}</h5></dd>
                
            </dl>
        </div>

    
    );
};

export default PostDetails;
