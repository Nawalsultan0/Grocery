import { Auth, login, logOut, register } from "../Controllers/userController.js";
import  express from 'express';
import AuthUser from "../Middleware/AuthUser.js";

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/is-auth',AuthUser,Auth);
userRouter.get('/logout',AuthUser, logOut);

export default userRouter;