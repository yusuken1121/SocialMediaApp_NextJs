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
//API to find the user
router.get("/find", isAuthenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: req.userId },
        });
        if (!user)
            return res.status(404).json({ message: "Cannot find the user" });
        res.status(201).json({
            user: { id: user.id, username: user.username, email: user.email },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error is occured" });
    }
}));
router.get("/profile/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId)
        res.status(404).json({ message: "The user does not exist" });
    try {
        const profile = yield prisma.profile.findUnique({
            where: { profileId: parseInt(userId) },
            include: { profile: true },
        });
        if (!profile)
            return res.status(404).json({ message: "cannot find the profile" });
        res.status(200).json({ profile });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error is occured" });
    }
}));
exports.default = router;
