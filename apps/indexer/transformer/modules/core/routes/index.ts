/* import express = require('express');
import getCaseStudyRouter from './api/case-studies/get-case-study';
import postCaseStudy from './api/case-studies/post-case-study';
import loginRouter from './api/login';
import { homeRouter } from './home';
import videosRouter from './api/videos/videos';
// import { videosRouter } from './videos';

const BASE_ROUTE = '/api';

const router = express.Router();

router.use(homeRouter);
router.use(getCaseStudyRouter);
router.use(postCaseStudy);
router.use(loginRouter);

router.use(BASE_ROUTE, videosRouter);

export default router;
 */
import express = require("express");

const router = express.Router;
