import express from 'express';
const router = express.Router();
router.get('/', function (req, res, next) {
res.end("AcademicAPI");
});
export default router;