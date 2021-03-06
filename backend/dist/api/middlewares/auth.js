"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// importing dependencies
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
// Handling Middleware Function
exports.adminAuth = (req, res, next) => {
    // Get token from headers
    const jwtToken = req.headers.authorization;
    const token = jwtToken.substr(7);
    // Check if token is not valid or not available
    if (!token) {
        return res.status(401).json({
            msg: 'Authorization Failed',
        });
    }
    // Verify the token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
        req.admin = decoded.admin;
        next();
    }
    catch (err) {
        res.status(401).json({
            msg: 'Token is not Valid',
            fullEerror: err,
        });
    }
};
exports.studentAuth = (req, res, next) => {
    // Get token from headers
    const jwtToken = req.headers.authorization;
    const token = jwtToken.substr(7);
    // Check if token is not valid or not available
    if (!token) {
        return res.status(401).json({
            msg: 'Authorization Failed',
        });
    }
    // Verify the token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
        req.student = decoded.student;
        next();
    }
    catch (err) {
        res.status(401).json({
            msg: 'Token is not Valid',
            fullEerror: err,
        });
    }
};
exports.facultyAuth = (req, res, next) => {
    // Get token from headers
    const jwtToken = req.headers.authorization;
    const token = jwtToken.substr(7);
    // Check if token is not valid or not available
    if (!token) {
        return res.status(401).json({
            msg: 'Authorization Failed',
        });
    }
    // Verify the token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
        req.faculty = decoded.faculty;
        next();
    }
    catch (err) {
        res.status(401).json({
            msg: 'Token is not Valid',
            fullEerror: err,
        });
    }
};
