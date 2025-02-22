const express = require('express');
const { blog_get, blog_post, blog_patch, blog_delete, blog_single, blog_like, blog_unlike, blog_comments, get_blog_comments } = require('../controllers/blog');
const { validateBlog } = require('../validator/validateBlog');
const { isLoggedin } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');

const blogRouter = express.Router();

blogRouter.get('/blogs',blog_get);
blogRouter.post('/blogs',validateBlog,isLoggedin,blog_post);
blogRouter.patch('/blogs',isLoggedin,blog_patch);
blogRouter.delete('/blogs',isLoggedin,blog_delete);
blogRouter.get('/blogs/:id',blog_single);
blogRouter.post("/blog_like", blog_like);
blogRouter.post("/blog_unlike", blog_unlike);
blogRouter.post("/blog_comments",  blog_comments);
blogRouter.get("/blog_comments",  get_blog_comments);


module.exports= blogRouter;