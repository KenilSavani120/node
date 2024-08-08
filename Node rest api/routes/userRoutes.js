import express from "express";
import {createUser,patch, fetchUser, updateUser, deleteUser} from "../controller/userController.js";
import {notEmptyValidate} from '../validators/validate.js'
import { emailValidationRules } from "../validators/user.validate.js";


const route = express.Router();

// Define routes
route.post("/",emailValidationRules,notEmptyValidate,createUser)
route.get("/", fetchUser);
route.put("/:id",updateUser)
route.delete("/:id",deleteUser)
route.patch("/:id",patch)

export default route;

