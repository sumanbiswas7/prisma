"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const { user, post } = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { userId, username, caption, image } = req.body;
    const userExists = await user.findUnique({
        where: {
            id: parseInt(userId)
        }
    });
    if (!userExists)
        return res.status(400).send(`user with userId - ${userId} doesn't exists`);
    const createdPost = await post.create({
        data: {
            profileId: userId,
            image,
            caption
        }
    });
    res.status(200).send(createdPost);
});
module.exports = router;
//# sourceMappingURL=post.js.map