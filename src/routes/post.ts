import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client"
const { user, post, like } = new PrismaClient();
const router = Router();



router.get("/", async (req: Request, res: Response) => {
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

    })
    res.status(200).send(posts)

})
router.post("/like", async (req: Request, res: Response) => {
    const { postId, userId } = req.body;
    const newLike = await like.create({
        data: {
            profile: userId,
            post: postId,
        }
    })

    res.status(200).send(newLike)
})

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