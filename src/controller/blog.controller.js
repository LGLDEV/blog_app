import { validationResult } from 'express-validator';
import blogModel from '../models/blog.model.js'

export const createBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        const { title, text, imageUrl, tags } = req.body;

        if (!errors.isEmpty()) {
            return res.status(403).json({ msg: "Registration failed", info: errors.errors })
        }

        const doc = new blogModel({
            title: title,
            text: text,
            imageUrl: imageUrl,
            tags: tags,
            user: req.userId
        });

        await doc.save()
        return res.json({
            msg: "Blog successfully created",
            data: doc
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Blog created unsuccessfully",
            info: "Internal server error"
        })
    }
}




export const getOne = async (req, res) => {
    try {
        const blogId = req.params.id;



        const doc = await blogModel.findByIdAndUpdate(
            blogId,
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after'
            },
        ).populate('user', {
            select: true
        }).exec();

        if (!doc) {
            return res.status(404).json({
                msg: "Get all blogs unsuccessfully",
                info: "Internal server error"
            });
        }

        return res.status(201).json({
            msg: "Get blog successfully",
            data: doc
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Get all blogs unsuccessfully",
            info: "Internal server error"
        })
    }
}



export const remove = async (req, res) => {
    try {
        const blogId = req.params.id;

        const blog = await blogModel.findByIdAndRemove(blogId);

        if (!blog) {
            return res.status(500).json({
                msg: "Delete blog unsuccessfully",
                info: "Internal server error"
            })
        }

        return res.json({
            msg: "Blog successfully deleted",
            data: blog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Delete blog unsuccessfully",
            info: "Internal server error"
        })
    }
}


export const update = async (req, res) => {
    try {
        const errors = validationResult(req);
        const { title, text, imageUrl, tags } = req.body;
        const id = req.params.id

        if (!errors.isEmpty()) {
            return res.status(403).json({ msg: "Update failed", info: errors.errors })
        }

        const blog = await blogModel.findByIdAndUpdate(id, {
            title: title,
            text: text,
            tags: tags,
            imageUrl: imageUrl
        },
        {
            returnDocument: 'after'
        }
        ).populate('user', {
            select: true
        }).exec();;

        if (!blog) {
            return res.status(500).json({
                msg: "Update blog unsuccessfully",
                info: "Internal server error"
            })
        }

        return res.json({
            msg: "Blog successfully updated",
            data: blog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Update blogs unsuccessfully",
            info: "Internal server error"
        })
    }
}



export const getAll = async (req, res) => {
    try {
        const blogs = await blogModel.find().populate('user', {
            select: true
        }).exec();


        return res.json({
            msg: "All blogs",
            data: blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Get all blogs unsuccessfully",
            info: "Internal server error"
        })
    }

}