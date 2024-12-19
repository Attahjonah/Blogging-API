const Router = require('express').Router
const BlogController = require('../controllers/blogController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const BlogMiddleware = require('../middlewares/blogMiddleware')

const route = Router()

route.post('/', BlogMiddleware.validatingBlogCreated, AuthMiddleware.ValidateToken, BlogController.CreateBlog);
route.get('/:blogId', BlogController.GetBlog);
route.get('/',  BlogController.GetAllBlog);
route.patch('/:blogId', AuthMiddleware.ValidateToken, BlogController.UpdateBlog);
route.delete('/:blogId', AuthMiddleware.ValidateToken, BlogController.DeleteBlog);

module.exports = route