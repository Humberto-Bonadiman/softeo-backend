"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["NOT_EMPTY"] = "All fields must be filled";
    ErrorMessage["INCORRECT_LOGIN"] = "Incorrect email or password";
    ErrorMessage["INVALID_TOKEN"] = "Expired or invalid token";
    ErrorMessage["NO_ID"] = "This id do not exist!";
    ErrorMessage["EXISTING_EMAIL"] = "This email is already in use";
    ErrorMessage["TOKEN_NOT_FOUND"] = "Token not found";
})(ErrorMessage || (ErrorMessage = {}));
exports.default = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map