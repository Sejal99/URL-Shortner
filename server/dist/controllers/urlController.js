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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUrls = exports.getUrls = exports.getAnalytics = exports.redirectToUrl = exports.postUrlData = void 0;
var express_1 = __importDefault(require("express"));
var url_1 = require("../models/url");
var nanoid_1 = require("nanoid");
var router = express_1.default.Router();
var postUrlData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, redirectUrl, shortId, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.headers['userId'];
                redirectUrl = req.body.redirectUrl;
                shortId = (0, nanoid_1.nanoid)(7);
                return [4 /*yield*/, url_1.urlModel.create({ shortId: shortId, redirectUrl: redirectUrl, createdBy: userId })];
            case 1:
                data = _a.sent();
                data.save();
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ error: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postUrlData = postUrlData;
var redirectToUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, f, urlDoc, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                console.log(id);
                return [4 /*yield*/, url_1.urlModel.updateOne({ shortId: id }, { $set: { $push: { visitHistory: Date.now() } } })];
            case 1:
                f = _a.sent();
                console.log(f);
                return [4 /*yield*/, url_1.urlModel.findOneAndUpdate({ shortId: id }, { $push: { visitHistory: Date.now() } })];
            case 2:
                urlDoc = _a.sent();
                res.json(urlDoc);
                console.log(urlDoc);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(404).json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.redirectToUrl = redirectToUrl;
var getAnalytics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, dateArray, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, url_1.urlModel.findOne({ shortId: id })
                    //console.log(dateArray?.visitHistory.length);
                ];
            case 1:
                dateArray = _a.sent();
                //console.log(dateArray?.visitHistory.length);
                res.status(200).json(dateArray === null || dateArray === void 0 ? void 0 : dateArray.visitHistory.length);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(404).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAnalytics = getAnalytics;
var getUrls = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var urls, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, url_1.urlModel.find({ createdBy: req.headers["userId"] })];
            case 1:
                urls = _a.sent();
                res.json(urls);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUrls = getUrls;
var getAllUrls = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var urls, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, url_1.urlModel.find({})];
            case 1:
                urls = _a.sent();
                res.json(urls);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(404).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUrls = getAllUrls;
