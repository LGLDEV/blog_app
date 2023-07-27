import { Router } from "express";


import { authChecker } from "../middlewares/auth.middleware.js";
import { getMe } from "../controller/auth.controller.js";
import { createBlog, getAll, getOne, remove, update } from "../controller/blog.controller.js";
import { blogValidator } from "../middlewares/validator.middleware.js";

const route = Router();




route.post('/create',authChecker, blogValidator, createBlog)
route.put('/update/:id', authChecker, update)
route.get('/delete/:id', authChecker, remove)
route.get('/get-all', getAll)
route.get('/:id', getOne)



export default route
