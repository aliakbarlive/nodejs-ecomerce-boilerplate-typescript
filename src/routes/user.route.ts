import express, { Router } from "express";

const router: Router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({
        status: "success",
        message: "get all system users",
    });
});

export default router