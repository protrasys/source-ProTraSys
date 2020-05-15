"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =============== Importing Dependencies ====================
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const path_1 = __importDefault(require("path"));
// ======================= Importing Routes  ==================
const student_1 = __importDefault(require("./api/routes/student"));
const faculty_1 = __importDefault(require("./api/routes/faculty"));
const admin_1 = __importDefault(require("./api/routes/admin"));
const app = express_1.default();
// ======================= Connecting to the Database ==================
database_1.default();
//=======================  Handling Cross Origin Resource Sharing =======================
app.use(cors_1.default());
// ======================= Declare BodyParser Alternative Middleware=======================
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// =======================  Handling Requests =======================
app.use('/students', student_1.default);
app.use('/faculty', faculty_1.default);
app.use('/admin', admin_1.default);
// ======================= Serve Static assets in production =======================
app.use(express_1.default.static('../frontend/build/'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend/build/index.html'));
});
app.listen(5000, (err) => {
    if (!err) {
        console.log(`▀▄▀▄▀▄ ωєℓ¢σмє тσ ρяσтяαѕуѕ ▄▀▄▀▄`);
        console.log(` Backend is Listening on: [${5000}]`);
    }
});
// ===================== Exporting app =====================
exports.default = app;
