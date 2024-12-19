const BlogModel = require('../models/blogModel')
const  calculateReadingTime   = require('../utils/calculateReadingTime')


// Create Blog
const CreateBlog = async (payload, user) => {
    const { body } = payload;
    const reading_time = calculateReadingTime(body);
    const blog = await BlogModel.create({
      ...payload,
      reading_time,
      user_id: user._id,
    });
  
    

    return {
        code: 201,
        success: true,
        message: 'Blog created successfully',
        data: {
            blog,
        }
    }

}
// Get Published Blog by ID
const GetBlog = async ( blogId ) => {
    const blog = await BlogModel.findById(blogId).populate("author", "firstName lastName email").exec();

    if (!blog) {
        return {
            code: 404,
            success: false,
            message: 'Blog not found',
            data: null,
        }
    }

    await BlogModel.findByIdAndUpdate(blogId, { $inc: {read_count: 1}})

    return {
        code: 200,
        success: true,
        message: 'Blog found',
        data: {
            blog
        },
    }

}

// Get published Blogs
const GetAllBlog = async () => {
    const blogs = await BlogModel.find();

    return {
        code: 200,
        success: true,
        message: 'Blog found',
        data: {
            blogs
        },
    }
}

// Update Blog
const UpdateBlog = async ({ blogId, text, user }) => {
    const blog = await BlogModel.findOne({ _id: blogId });

    if (!blog) {
        return {
            code: 404,
            success: false,
            message: 'Blog not found',
            data: null,
        }
    }


    blog.text = text || blog.text
    blog.update_at = new Date()

    await blog.save()

    return {
        code: 200,
        success: true,
        message: 'Blog updated successfully',
        data: {
            blog
        },
    }
}

// Deleting a Blog
const DeleteBlog = async ({ user, blogId }) => {
    const blog = await BlogModel.findOne({ _id: blogId, user_id: user._id });

    if (!blog) {
        return {
            code: 404,
            success: false,
            message: 'Blog not found',
            data: null,
        }
    }

    await blog.deleteOne({
        _id: blogId, user_id: user._id
    })

    return {
        code: 200,
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    }
}


module.exports = {
    CreateBlog,
    GetBlog,
    GetAllBlog,
    UpdateBlog,
    DeleteBlog
}