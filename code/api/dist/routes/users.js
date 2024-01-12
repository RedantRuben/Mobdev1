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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
//registreren
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Gebruiker bestaat al.' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new user_1.default({
            name,
            email,
            password: hashedPassword
        });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, 'jouw_jwt_geheime_sleutel', { expiresIn: '1h' });
        res.status(201).json({ token, userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Iets ging mis bij het registreren.' });
    }
}));
exports.default = router;
//inlog
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Gebruiker niet gevonden.' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Ongeldig wachtwoord.' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, 'jouw_jwt_geheime_sleutel', { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Inloggen mislukt.' });
    }
}));
