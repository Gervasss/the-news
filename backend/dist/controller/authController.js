import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma";
export const loginOrRegister = async (req, res) => {
    const { email } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        user = await prisma.user.create({ data: { email } });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
};
