import { Router } from "express";
import { login, logout, register } from "../controller/auth.controller.js";

import { registerValidator } from "../middlewares/validator.middleware.js";

const route = Router();


route.post('/login', login)
route.post('/register', registerValidator, register)
route.get('/logout', logout)



export default route
