export enum ErrorMessages {
  // User Error Messages
  USER_EMAIL_EXISTS_ERROR = 'User Email Exists Already',
  USERNAME_EXISTS_ERROR = 'Username exists Already',
  USER_NOT_FOUND = 'User Not Found',
  INCORRECT_OLD_PASSWORD = 'Incorrect Old Password',
  CANT_UPDATE_USER_EMAIL = 'User Email can not be Updated',

  // AUth Errors
  INVALID_LOGIN_DETAILS_ERROR = 'Invalid username or password',
  DOCTOR_INACTIVE_ERROR = 'Vendor is Inactive',
  AUTH_TOKEN_REQUIRED_ERROR = 'Authorization token is required',
  INVALID_USER_REQUIRED_ERROR = 'User Not Authorized',
  INVALID_AUTH_TOKEN_ERROR = 'Invalid Authorization token',

  // Database
  DATABASE_ERROR = 'An Error Occurred',
}

export enum DatabaseErrorNumber {
  DUPLICATE_KEY = 1062,
}
