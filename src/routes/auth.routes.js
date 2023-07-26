import { Router } from "express";
import { getMe, login, register } from "../controller/auth.controller.js";

import { loginValidator, registerValidator } from "../middlewares/validator.middleware.js";

import { authChecker } from "../middlewares/auth.middleware.js";

const route = Router();


route.post('/login', loginValidator, login)
route.post('/register', registerValidator, register)
route.get('/me', authChecker, getMe)



export default route
