import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await user.findMany();
  res.status(200).send(users);
});

router.get("/posts", async (req: Request, res: Response) => {
  const users = await user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      cratedAt: true,
      Post: true
    }
  });
  res.status(200).send(users);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, username } = req.body;
  const userExists = await user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) return res.status(400).send(`User with username "${username}" already exists`)

  const createdUser = await user.create({
    data: {
      name,
      username
    }
  })

  res.status(200).send(createdUser)
});

module.exports = router;
