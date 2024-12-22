const { object } = require("joi");
const BlogModel = require("../models/blogModel");
const calculateReadingTime = require("../utils/calculateReadingTime");

// Create Blog
const CreateBlog = async (payload, user) => {
  const { body } = payload;

  const reading_time = calculateReadingTime(body);

  try {
    const blog = await BlogModel.create({
      ...payload,
      reading_time,
      user_id: user._id,
    });
    return {
      code: 201,
      success: true,
      message: "Blog created successfully",
      data: {
        blog,
      },
    };
  } catch (error) {
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return {
        code: 400,
        success: false,
        message: "Duplicate key",
        data: { message: `${duplicatedField} already exist` },
      };
    }
  }

  return {
    code: 404,
    success: false,
    message: "Blog not found",
    data: null,
  };
};
// Get Blog by ID
const GetBlog = async (blogId) => {
  const blog = await BlogModel.findById(blogId)
    .populate("author", "firstName lastName email")
    .exec();

  if (!blog) {
    return {
      code: 404,
      success: false,
      message: "Blog not found",
      data: null,
    };
  }

  await BlogModel.findByIdAndUpdate(blogId, { $inc: { read_count: 1 } });

  return {
    code: 200,
    success: true,
    message: "Blog found",
    data: {
      blog,
    },
  };
};

// Get all Blogs
const GetAllBlog = async ({
  user_id,
  text,
  page = 1,
  state,
  tags,
  perPage = 10,
}) => {
  const query = {};

  if (user_id) {
    query.author = user_id;
  }

  if (text) {
    query.$or = [
      { title: { $regex: text, $options: "i" } },
      { body: { $regex: text, $options: "i" } },
    ];
  }

  if (state) {
    query.state = state;
  }

  if (tags && Array.isArray(tags) && tags.length > 0) {
    query.tags = { $in: tags };
  }

  const blogs = await BlogModel.paginate(query, { page, limit: perPage });

  return {
    code: 200,
    success: true,
    message: "Blog found",
    data: {
      blogs,
    },
  };
};

// Update Blog
const UpdateBlog = async (blogId, payload, user) => {
  try {
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return {
        code: 404,
        success: false,
        message: "Blog not found",
        data: null,
      };
    }
    // Checking if blog belongs to user

    if (blog.author._id.toString() !== user._id.toString()) {
      return {
        code: 40,
        success: false,
        message: "You are not authorized to update blog",
        data: null,
      };
    }

    // Updating provided payload fields
    blog.title = payload.title || blog.title;
    blog.description = payload.description || blog.description;
    blog.body = payload.body || blog.body;
    blog.tags = payload.tags || blog.tags;
    blog.state = payload.state || blog.state;

    // Updating reading time if body is updated
    if (payload.body) {
      blog.reading_time = calculateReadingTime(payload.body);
    }

    blog.update_at = new Date();

    await blog.save();

    return {
      code: 200,
      success: true,
      message: "Blog updated successfully",
      data: {
        blog,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: "Error occured while updating the blog",
      data: null,
    };
  }
};

// Deleting a Blog
const DeleteBlog = async (blogId, user) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    return {
      code: 404,
      success: false,
      message: "Blog not found",
      data: null,
    };
  }

  if (!blog.author._id.equals(user._id)) {
    return {
      code: 404,
      success: false,
      message: "You are not allowed to delete this article",
      data: null,
    };
  }

  await BlogModel.findByIdAndDelete(blogId);

  return {
    code: 200,
    success: true,
    message: "Blog deleted successfully",
    data: null,
  };
};

module.exports = {
  CreateBlog,
  GetBlog,
  GetAllBlog,
  UpdateBlog,
  DeleteBlog,
};
