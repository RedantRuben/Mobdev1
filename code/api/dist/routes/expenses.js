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
const expense_1 = __importDefault(require("../models/expense"));
const router = express_1.default.Router();
// Haal alle uitgaven voor een trip op
router.get('/trip/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield expense_1.default.find({ tripId: req.params.tripId });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon uitgaven niet ophalen.' });
    }
}));
// Voeg een nieuwe uitgave toe
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tripId, userId, description, amount, date } = req.body;
        const expense = new expense_1.default({ tripId, userId, description, amount, date });
        yield expense.save();
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon uitgave niet toevoegen.' });
    }
}));
// Update een uitgave
router.put('/:expenseId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield expense_1.default.findByIdAndUpdate(req.params.expenseId, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ message: 'Uitgave niet gevonden.' });
        }
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon uitgave niet bijwerken.' });
    }
}));
// Verwijder een uitgave
router.delete('/:expenseId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield expense_1.default.findByIdAndDelete(req.params.expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Uitgave niet gevonden.' });
        }
        res.json({ message: 'Uitgave verwijderd.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Kon uitgave niet verwijderen.' });
    }
}));
exports.default = router;
