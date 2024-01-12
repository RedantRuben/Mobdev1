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
const trip_1 = __importDefault(require("../models/trip"));
const router = express_1.default.Router();
// Alle trips ophalen
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trips = yield trip_1.default.find();
        res.json(trips);
    }
    catch (error) {
        res.status(500).json({ message: 'Kan trips niet ophalen.' });
    }
}));
// Trip details ophalen
router.get('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trip = yield trip_1.default.findById(req.params.tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip niet gevonden.' });
        }
        res.json(trip);
    }
    catch (error) {
        res.status(500).json({ message: 'Kan trip details niet ophalen.' });
    }
}));
// Nieuwe trip creëren
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, destination, startDate, endDate } = req.body;
        const trip = new trip_1.default({ userId, destination, startDate, endDate });
        yield trip.save();
        res.status(201).json(trip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Kon trip niet creëren.' });
    }
}));
// Trip bijwerken
router.put('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTrip = yield trip_1.default.findByIdAndUpdate(req.params.tripId, req.body, { new: true });
        res.json(updatedTrip);
    }
    catch (error) {
        res.status(500).json({ message: 'Kon trip niet bijwerken.' });
    }
}));
// Trip verwijderen
router.delete('/:tripId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trip_1.default.findOneAndDelete({ _id: req.params.tripId });
        if (!result) {
            return res.status(404).json({ message: 'Trip niet gevonden.' });
        }
        res.json({ message: 'Trip verwijderd.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Kon trip niet verwijderen.' });
    }
}));
exports.default = router;
