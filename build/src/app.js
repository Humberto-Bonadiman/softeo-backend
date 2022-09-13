"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
require("dotenv/config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dentistRoute_1 = __importDefault(require("./routes/dentistRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const clientRoute_1 = __importDefault(require("./routes/clientRoute"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    config() {
        this.app.use((0, cors_1.default)());
        const accessControl = (_req, res, next) => {
            res.source('/:path*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use(express_1.default.json());
        this.app.get('/', (_req, res) => {
            res.status(200).json({ message: 'Rodando' });
        });
        this.app.use('/dentist', dentistRoute_1.default);
        this.app.use('/login', loginRoute_1.default);
        this.app.use('/client', clientRoute_1.default);
        this.app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));
    }
}
exports.App = App;
exports.app = new App().app;
//# sourceMappingURL=app.js.map