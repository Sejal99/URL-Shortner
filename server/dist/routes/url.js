"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var urlController_1 = require("../controllers/urlController");
var verifyJwt_1 = require("../middleware/verifyJwt");
var authorization_1 = __importDefault(require("../middleware/authorization"));
var router = express_1.default.Router();
router.post('/', verifyJwt_1.vertifyJwt, urlController_1.postUrlData);
router.get('/:id', verifyJwt_1.vertifyJwt, urlController_1.redirectToUrl);
router.get('/analytics/:id', verifyJwt_1.vertifyJwt, urlController_1.getAnalytics);
router.post('/getAllUrls', verifyJwt_1.vertifyJwt, (0, authorization_1.default)(['NORMAL', 'ADMIN']), urlController_1.getUrls);
router.post('/admin/urls', verifyJwt_1.vertifyJwt, (0, authorization_1.default)(['ADMIN']), urlController_1.getAllUrls);
exports.default = router;
