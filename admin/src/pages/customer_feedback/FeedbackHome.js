import React, { Component, createRef } from 'react';
import axios from 'axios';
import './FeedbackHome.css';


export default class FeedbackHome extends Component {
  constructor(props){
    super(props);

    this.state={
      posts:[],
      replySubmitted: false,
      reviewCount: 0,
      averageRating: 0,
      hairCareAverageRating: 0,
      skinCareAverageRating: 0,
      nailCareAverageRating: 0
    };

    this.ComponentsRef = createRef();
  }

  componentDidMount(){
    this.retrievPosts();
  }

  retrievPosts(){
    axios.get("http://localhost:5000/posts").then(res =>{
      if(res.data.success){
        const posts = res.data.existingPosts;
        const reviewCount = posts.length;
        const averageRating = this.calculateAverageRating(posts);
        const hairCarePosts = posts.filter(post => post.service.toLowerCase() === 'hair care');
        const hairCareAverageRating = this.calculateAverageRating(hairCarePosts);
        const skinCarePosts = posts.filter(post => post.service.toLowerCase() === 'skin care');
        const skinCareAverageRating = this.calculateAverageRating(skinCarePosts);
        const nailCarePosts = posts.filter(post => post.service.toLowerCase() === 'nail care');
        const nailCareAverageRating = this.calculateAverageRating(nailCarePosts);

        this.setState({
          posts: posts,
          reviewCount: reviewCount,
          averageRating: averageRating,
          hairCareAverageRating: hairCareAverageRating,
          skinCareAverageRating: skinCareAverageRating,
          nailCareAverageRating: nailCareAverageRating
        });
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:5000/post/delete/${id}`).then((res) =>{
      alert("Delete Successfully");
      this.retrievPosts();
    });
  }

  filterData(posts,searchKey){
    const result = posts.filter((post) =>
      post.service.toLowerCase().includes(searchKey)||
      post.name.toLowerCase().includes(searchKey)||
      post.review.toLowerCase().includes(searchKey)||
      post.email.toLowerCase().includes(searchKey)||
      post.reply.toLowerCase().includes(searchKey)
    );

    this.setState({posts:result});
  }

  handleSearchArea = (e) =>{
    const searchKey= e.currentTarget.value;

    axios.get("http://localhost:5000/posts").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingPosts,searchKey);
      }
    });
  }

  handlePrint = () => {
    window.print();
    alert("Users Report Successfully Downloaded !");
  }

  handleReplySubmitted = () => {
    this.setState({ replySubmitted: true });
  };

  calculateAverageRating(posts) {
    const totalRating = posts.reduce((acc, post) => acc + post.rating, 0);
    return totalRating / (posts.length || 1); // Handle division by zero
  }

  render() {
    return (
      <div className="feed_admincontainer">
        <div className="feed_adminrow">
          <div className="feed_admin_header" >
            <h4>All Feedbacks</h4>
            
          </div>

          <div>
            <button onClick={this.handlePrint} className='feed_admin_dRepo' id="feed_admin_genRepo">Download Report</button>
          </div>

          <div className="col-lg-3" id="feed_admin_genRepo">
            <input
              className="feed_admin_form_control feed_admin_btnsearch"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
        </div>
        
        <table className="feed_admin_table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Service</th>
              <th scope="col">Rating</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Review</th>
              <th scope="col">Answer</th>
              <th scope="col" id="feed_admin_genRepo">Action</th>
            </tr>
          </thead>

           <tbody ref={this.ComponentsRef}>
            {this.state.posts.map((post,index) =>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <a href={`/post/${post._id}`} style={{textDecoration:'none'}}>
                    {post.service}
                  </a>   
                </td>
                <td>{post.rating}</td>
                <td>{post.name}</td>
                <td>{post.review}</td>
                <td>{post.reply}</td>
                <td>
                  {!post.reply && !this.state.replySubmitted && ( 
                    <a className="feed_admin_btn_warning" id="feed_admin_genRepo"  href={`/feedbackreply/${post._id}`}>
                      <i></i>&nbsp;Reply
                    </a>
                  )}
                  &nbsp;
                  <a className="feed_admin_btn_danger" id="feed_admin_genRepo"  href="#" onClick={() =>this.onDelete(post._id)}>
                    <i></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p>Average Rating for Hair Care: {this.state.hairCareAverageRating.toFixed(2)}</p>
          <p>Average Rating for Skin Care: {this.state.skinCareAverageRating.toFixed(2)}</p>
          <p>Average Rating for Nail Care: {this.state.nailCareAverageRating.toFixed(2)}</p>
          <p>Total Reviews: {this.state.reviewCount}</p>
          <p>Average Rating: {this.state.averageRating.toFixed(2)}</p>
        </div>
      </div>
    )
  }
}
