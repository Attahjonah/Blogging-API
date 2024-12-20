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

    const serviceResponse = await BlogService.GetAllBlog();

    return res.status(serviceResponse.code).json(serviceResponse);
}

const UpdateBlog = async (req, res) => {
    const blogId = req.params.blogId
    const user = req.user;
    const text = req.body.text;

    const serviceResponse = await BlogService.UpdateBlog(
        blogId,
        user,
        text,
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