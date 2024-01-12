"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const trips_1 = __importDefault(require("./routes/trips"));
const activities_1 = __importDefault(require("./routes/activities"));
const notes_1 = __importDefault(require("./routes/notes"));
const settings_1 = __importDefault(require("./routes/settings"));
const expenses_1 = __importDefault(require("./routes/expenses"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173' // Vervang dit door de URL van je frontend
}));
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/trips', trips_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/notes', notes_1.default);
app.use('/api/settings', settings_1.default);
app.use('/api/expenses', expenses_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const mongoURI = 'mongodb+srv://rubenRedant:4B6XKz0EmLnSn8ZR@firstclustertravelplann.edbfpys.mongodb.net/?retryWrites=true&w=majority';
mongoose_1.default.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.get('/', (req, res) => {
    res.send('Welkom bij de Travel Planner API!');
});
