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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateIdenticon_1 = require("../utils/generateIdenticon");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
//API for register a new user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword,
            profile: {
                create: {
                    bio: "testBio", // hard-coded
                    profileImgUrl: (0, generateIdenticon_1.generateAvatar)(email),
                },
            },
        },
        include: {
            profile: true,
        },
    });
    res.status(201).json(user);
}));
//API for login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "The user does not exist" });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });
    return res.json({ token });
}));
exports.default = router;
