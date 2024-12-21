const BlogService = require('../services/blogService')

const CreateBlog = async (req, res) => {
    const payload = req.body;
    const user = req.user;

    const serviceResponse = await BlogService.CreateBlog(
        payload, 
        user
    )

    return res.status(serviceResponse.code).json(serviceResponse);
}

const GetBlog = async (req, res) => {
    
    const blogId = req.params.blogId

    const serviceResponse = await BlogService.GetBlog(
        blogId 
    )

    return res.status(serviceResponse.code).json(serviceResponse);
}
const GetAllBlog = async (req, res) => {

    const {user_id, text, page = 1, perPage = 10} = req.query;
    const serviceResponse = await BlogService.GetAllBlog({
        user_id, text, page, perPage
    });

    return res.status(serviceResponse.code).json(serviceResponse);
}

const UpdateBlog = async (req, res) => {
    const blogId = req.params.blogId
    const user = req.user;
    const payload = req.body;

    const serviceResponse = await BlogService.UpdateBlog(
        blogId,
        payload,
        user,
    )

    return res.status(serviceResponse.code).json(serviceResponse);
}
const DeleteBlog = async (req, res) => {
    const blogId = req.params.blogId
    const user = req.user;

    const serviceResponse = await BlogService.DeleteBlog(
        blogId,
        user
    )

    return res.status(serviceResponse.code).json(serviceResponse);
}

module.exports = {
    CreateBlog,
    GetAllBlog,
    GetBlog,
    UpdateBlog,
    DeleteBlog
}