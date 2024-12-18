const Router = require('express').Router
const BlogController = require('../controllers/blogController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const route = Router()

route.post('/', AuthMiddleware.ValidateToken, BlogController.CreateBlog);
route.get('/:blogId', BlogController.GetBlog);
route.get('/',  BlogController.GetAllBlog);
route.patch('/:blogId', AuthMiddleware.ValidateToken, BlogController.UpdateBlog);
route.delete('/:blogId', AuthMiddleware.ValidateToken, BlogController.DeleteBlog);

module.exports = route