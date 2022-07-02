"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const { user } = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const users = await user.findMany();
    res.status(200).send(users);
});
router.get("/posts", async (req, res) => {
    const users = await user.findMany({
        select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            cratedAt: true,
            Post: {
                select: {
                    id: true,
                    caption: true,
                    createdAt: true,
                    Like: true
                }
            }
        }
    });
    res.status(200).send(users);
});
router.post("/", async (req, res) => {
    const { name, username } = req.body;
    const userExists = await user.findUnique({
        where: {
            username,
        },
    });
    if (userExists)
        return res.status(400).send(`User with username "${username}" already exists`);
    const createdUser = await user.create({
        data: {
            name,
            username
        }
    });
    res.status(200).send(createdUser);
});
module.exports = router;
//# sourceMappingURL=user.js.map