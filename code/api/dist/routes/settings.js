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
const settings_1 = __importDefault(require("../models/settings"));
const router = express_1.default.Router();
// Haal instellingen op voor een gebruiker
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield settings_1.default.findOne({ userId: req.params.userId });
        if (!settings) {
            return res.status(404).json({ message: 'Instellingen niet gevonden.' });
        }
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon instellingen niet ophalen.' });
    }
}));
// Update of maak instellingen voor een gebruiker
router.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield settings_1.default.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true, upsert: true });
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon instellingen niet bijwerken.' });
    }
}));
exports.default = router;
