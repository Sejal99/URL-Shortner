"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var urlController_1 = require("../controllers/urlController");
var router = express_1.default.Router();
router.post('/', urlController_1.postUrlData);
router.get('/:id', urlController_1.redirectToUrl);
router.get('/analytics/:id', urlController_1.getAnalytics);
router.post('/getAllUrls', urlController_1.getUrls);
router.post('/admin/urls', urlController_1.getAllUrls);
router.delete('/remove/:id', urlController_1.deleteUrl);
exports.default = router;
