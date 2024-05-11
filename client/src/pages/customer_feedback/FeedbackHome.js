import React, { Component } from 'react';
import axios from 'axios';
import Feed_Card from './shared/Feed_Card';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './FeedbackHome.css';

export default class FeedbackHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      expanded: {},
      reviewCount: 0,
      averageRating: 0
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:5000/posts").then(res => {
      if (res.data.success) {
        const posts = res.data.existingPosts;
        const reviewCount = posts.length;
        const averageRating = this.calculateAverageRating(posts);
        this.setState({
          posts: posts,
          reviewCount: reviewCount,
          averageRating: averageRating
        });
      }
    });
  }

  onDelete = (id) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    
    
    if (confirmDelete) {
      
      axios.delete(`http://localhost:5000/post/delete/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      }).catch((error) => {
        console.error("Error:", error.message);
      });
    } else {
      
      alert("Deletion canceled");
    }
  }

  filterData(posts, searchKey) {
    const result = posts.filter((post) =>
      post.service.toLowerCase().includes(searchKey) ||
      post.name.toLowerCase().includes(searchKey) ||
      post.review.toLowerCase().includes(searchKey)||
      post.reply.toLowerCase().includes(searchKey)
    )

    this.setState({ posts: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value

    axios.get("http://localhost:5000/posts").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey)
      }
    });
  }

  toggleExpand = (postId) => {
    this.setState(prevState => ({
      expanded: {
        ...prevState.expanded,
        [postId]: !prevState.expanded[postId]
      }
    }));
  }

  calculateAverageRating(posts) {
    const totalRating = posts.reduce((acc, post) => acc + post.rating, 0);
    return totalRating / posts.length || 0;
  }

  render() {
    const { expanded, reviewCount, averageRating } = this.state;
    return (
      <div className='feed_body'>
        <div className="feed-row">
          <div className="feed_col-lg-9">
            <h4 className='feed_header'>All Reviews</h4><br/>
            <p>Total Reviews: {reviewCount}</p>
            <p>Average Rating: {averageRating.toFixed(2)}</p>
          </div>
          <div className="feed_col-lg-3">
            <input
              className="feed_form-control feed_btnsearch"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
        </div>
        
        <div className="feed_post-list">
          {this.state.posts.map((post, index) => (
            <Feed_Card key={index} className="feed_post-card">
              <div className="feed_num-display">{post.rating}</div>
              <button onClick={() => this.onDelete(post._id)} className="feed_close">
                <FaTrashAlt color="black" />
              </button>
              <button onClick={() => window.location.href=`/edit/${post._id}`} className="feed_edit-button">
                <FaEdit color="black" />
              </button>
              <div className="feed_text-display">{post.text}</div>
              <div>
                <div>Review: {post.review} </div>
                <div className='feed_answer'> Answer: {post.reply}</div><br/>
                
                {!expanded[post._id] && (
                  <button onClick={() => this.toggleExpand(post._id)} className='feed_see-more'>
                    See More
                  </button>
                )}
                {expanded[post._id] && (
                  <div>
                    <div>Service: {post.service}</div>
                    <div>Name: {post.name}</div>
                    <button onClick={() => this.toggleExpand(post._id)} className='feed_see-more'>
                      See Less
                    </button>
                  </div>
                )}
              </div>
            </Feed_Card>
          ))}
        </div>

        <button className="feed_btn-success">
          <a href="/addfeedback" style={{textDecoration:'none',color:'white'}}>Give FeedBack</a>
        </button>

      </div>
    )
  }
}
