import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Allrsigasdaht");
});

module.exports = router;
