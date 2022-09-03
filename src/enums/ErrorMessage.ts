enum ErrorMessage {
  NOT_EMPTY = 'All fields must be filled',
  INCORRECT_LOGIN = 'Incorrect email or password',
  INVALID_TOKEN = 'Expired or invalid token',
  NO_ID = 'This id do not exist!',
  EXISTING_EMAIL = 'This email is already in use',
  TOKEN_NOT_FOUND = 'Token not found'
}

export default ErrorMessage;