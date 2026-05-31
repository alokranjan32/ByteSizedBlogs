 import { Router } from 'express';
const router = Router();

import { registerUser, loginUser,logout ,getme} from '../controller/user.controller.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/getme').get(getme);

export default router;
