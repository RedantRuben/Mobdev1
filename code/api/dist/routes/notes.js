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
const note_1 = __importDefault(require("../models/note"));
const router = express_1.default.Router();
// Alle notities voor een specifieke trip ophalen
router.get('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find({ tripId: req.params.tripId });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Kan notities niet ophalen.' });
    }
}));
// Notitie toevoegen
router.post('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const note = new note_1.default({ tripId: req.params.tripId, content });
        yield note.save();
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon notitie niet toevoegen.' });
    }
}));
// Notitie bijwerken
router.put('/:noteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedNote = yield note_1.default.findByIdAndUpdate(req.params.noteId, { content: req.body.content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Notitie niet gevonden.' });
        }
        res.json(updatedNote);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon notitie niet bijwerken.' });
    }
}));
// Notitie verwijderen
router.delete('/:noteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findByIdAndDelete(req.params.noteId);
        if (!note) {
            return res.status(404).json({ message: 'Notitie niet gevonden.' });
        }
        res.status(204).send(); // 204 No Content
    }
    catch (error) {
        res.status(500).json({ message: 'Kon notitie niet verwijderen.' });
    }
}));
exports.default = router;
