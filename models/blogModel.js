const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const BlogSchema = new mongoose.Schema({
    _id: { 
        type: String 
    },

    title: { 
        type: String, 
        required: true, 
        unique: true
    },

    description: { 
        type: String 
    },

    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },

    state: { 
        type: String, 
        required: true, 
        enum: ['draft', 'published'], 
        default: 'draft'
    },

    read_count: { 
        type: Number, 
        default: 0 
    },

    reading_time: { type: Number },

    tags: { type: String },

    body: { 
        type: String, 
        required: true},

},  {timestamps: true}
)

BlogSchema.plugin(mongoosePaginate);

const BlogModel = mongoose.model( 'blog', BlogSchema);
module.exports = BlogModel;