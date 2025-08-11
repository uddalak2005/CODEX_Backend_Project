// models/projectModel.js

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            minlength: [3, 'Title should be at least 3 characters long'],
            maxlength: [100, 'Title should not exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
            minlength: [10, 'Description should be at least 10 characters long'],
            maxlength: [500, 'Description should not exceed 500 characters']
        },
        techStack: {
            type: [String],
            required: [true, 'Tech stack is required'],
            validate: {
                validator: (arr) => arr.length > 0,
                message: 'At least one technology is required'
            }
        },
        liveLink: {
            type: String,
            validate: {
                validator: function (v) {
                    return !v || /^https?:\/\/.+$/.test(v);
                },
                message: 'Invalid live link URL'
            }
        },
        repoLink: {
            type: String,
            validate: {
                validator: function (v) {
                    return !v || /^https?:\/\/.+$/.test(v);
                },
                message: 'Invalid repository URL'
            }
        },
        images: {
            type: [String], // Store array of Cloudinary publicIds or URLs
            default: []
        },
        videoLink: String
    },
    { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
