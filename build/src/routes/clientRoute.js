"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const clientController_1 = __importDefault(require("../controllers/clientController"));
const validateClient_1 = require("../middlewares/validateClient");
const validateDentistId_1 = __importDefault(require("../middlewares/validateDentistId"));
const validateId_1 = __importDefault(require("../middlewares/validateId"));
const validateToken_1 = require("../middlewares/validateToken");
const clientRouter = express.Router();
clientRouter
    .post('/', validateToken_1.validateToken, validateClient_1.validateClient, new clientController_1.default().create)
    .get('/', validateToken_1.validateToken, new clientController_1.default().findAll)
    .get('/:id', validateToken_1.validateToken, validateId_1.default, new clientController_1.default().findById)
    .get('/:dentistId/dentist', validateToken_1.validateToken, validateDentistId_1.default, new clientController_1.default().findByDentistId)
    .put('/:id', validateToken_1.validateToken, validateId_1.default, validateClient_1.validateClient, new clientController_1.default().updateById)
    .delete('/:id', validateToken_1.validateToken, validateId_1.default, new clientController_1.default().deleteById);
exports.default = clientRouter;
//# sourceMappingURL=clientRoute.js.map