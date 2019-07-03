"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const universal_cookie_express_1 = __importDefault(require("universal-cookie-express"));
const UIMiddleware_1 = require("./UIMiddleware");
const StartServer = async () => {
    const app = express_1.default();
    app.use(universal_cookie_express_1.default());
    app.use(express_1.default.static('dist/public'));
    app.use(UIMiddleware_1.hotUiServer);
    app.listen(80, () => console.log('http://localhost:81'));
};
StartServer();
