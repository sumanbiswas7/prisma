"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const { user, post, like } = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const posts = await post.findMany({
        select: {
            id: true,
            author: true,
            caption: true,
            createdAt: true,
            image: true,
            Like: {
                select: {
                    userId: true
                }
            }
        }
    });
    res.status(200).send(posts);
});
router.post("/like", async (req, res) => {
    const { postId, userId } = req.body;
    const newLike = await like.create({
        data: {
            profile: userId,
            post: postId,
        }
    });
    res.status(200).send(newLike);
});
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