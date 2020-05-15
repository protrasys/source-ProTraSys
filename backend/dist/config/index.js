"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MONGOURL = 'mongodb+srv://admin:admin123@bhainichaal-tutym.mongodb.net/protrasys?retryWrites=true&w=majority';
const JWTSECRET = 'badboysecurities';
// ===================== Exporting Credentials =========================
exports.databaseString = MONGOURL;
exports.jwtSecret = JWTSECRET;
exports.port = process.env.PORT || 5000;
