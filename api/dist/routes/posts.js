"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
//API for comment post
router.post("/post", isAuthenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    if (!content)
        return res.status(400).json({ message: "Content is missing" });
    if (!req.userId) {
        return res.status(401).json({ message: "User ID is missing in request" });
    }
    try {
        const newPost = yield prisma.post.create({
            data: {
                content,
                authorId: req.userId,
            },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error is occured" });
    }
}));
//API to get posts
router.get("/latest-posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestPosts = yield prisma.post.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return res.json({ latestPosts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error is occured" });
    }
}));
//API to filter the post by user
router.get("/:userId/user-posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userPosts = yield prisma.post.findMany({
            where: { authorId: parseInt(userId) },
            orderBy: { createdAt: "desc" },
            include: { author: { include: { profile: true } } },
        });
        return res.json({ userPosts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "cannot find posts" });
    }
    res.status(200).json();
}));
exports.default = router;
