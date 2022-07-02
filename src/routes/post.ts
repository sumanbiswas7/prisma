import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client"
const { user, post } = new PrismaClient();
const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { userId, username, caption, image } = req.body;
    const userExists = await user.findUnique({
        where: {
            id: parseInt(userId)
        }
    })

    if (!userExists) return res.status(400).send(`user with userId - ${userId} doesn't exists`)

    const createdPost = await post.create({
        data: {
            profileId: userId,
            image,
            caption
        }
    })

    res.status(200).send(createdPost)

})

module.exports = router