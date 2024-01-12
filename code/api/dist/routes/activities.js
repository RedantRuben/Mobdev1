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
const activity_1 = __importDefault(require("../models/activity"));
const router = express_1.default.Router();
// Alle activiteiten voor een specifieke trip ophalen
router.get('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield activity_1.default.find({ tripId: req.params.tripId });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Kan activiteiten niet ophalen.' });
    }
}));
// Activiteit toevoegen
router.post('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, date } = req.body;
        const activity = new activity_1.default({ tripId: req.params.tripId, name, type, date });
        yield activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon activiteit niet toevoegen.' });
    }
}));
// Activiteit bijwerken
router.put('/:activityId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedActivity = yield activity_1.default.findByIdAndUpdate(req.params.activityId, { name: req.body.name, type: req.body.type, date: req.body.date }, { new: true });
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activiteit niet gevonden.' });
        }
        res.json(updatedActivity);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon activiteit niet bijwerken.' });
    }
}));
// Activiteit verwijderen
router.delete('/:activityId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield activity_1.default.findByIdAndDelete(req.params.activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activiteit niet gevonden.' });
        }
        res.status(204).send(); // 204 No Content
    }
    catch (error) {
        res.status(500).json({ message: 'Kon activiteit niet verwijderen.' });
    }
}));
exports.default = router;
