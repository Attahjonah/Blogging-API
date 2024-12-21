const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const BlogSchema = new mongoose.Schema({
    
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
        required: true,
        ref: 'user' 
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

    reading_time: { type: String },

    tags: { type: [String] },

    body: { 
        type: String, 
        required: true},

},  {timestamps: true}
)

BlogSchema.plugin(mongoosePaginate);

const BlogModel = mongoose.model( 'blog', BlogSchema);
module.exports = BlogModel;