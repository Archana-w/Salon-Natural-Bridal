// posts.js/routes
const express = require('express');
const Posts = require('..//models/posts');


const router = express.Router();

// Save posts
router.post('/post/save', async (req, res) => {
    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
            success: "FeedBack saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    } 
});

// Get posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


// Get a specific post
router.get("/post/:id", (req, res) => {
    let postId = req.params.id;
    Posts.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ success: false, message: "FeedBack not found" });
            }
            return res.status(200).json({ success: true, post });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err.message });
        });
});



// Update posts
router.put('/post/update/:id', async (req, res) => {
    try {
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        return res.status(200).json({
            success: "Updated Successfully",
            updatedPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


// Delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findOneAndDelete({ _id: req.params.id }).exec();
        if (!deletedPost) {
            return res.status(404).json({ message: "FeedBack not found" });
        }
        return res.json({ message: "Delete Successful", deletedPost });
    } catch (err) {
        return res.status(400).json({ message: "Delete Unsuccessful", error: err.message });
    }
});



module.exports = router;