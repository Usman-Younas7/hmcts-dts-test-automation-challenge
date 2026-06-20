export type LoginUser = {
  username: string;
  password: string;
};

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password'
  },
  validUsernameWrongPassword: {
    username: 'standard_user',
    password: 'wrong_password'
  },
  invalidUsernameValidPassword: {
    username: 'fake_user',
    password: 'secret_sauce'
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce'
  },
  emptyPassword: {
    username: 'standard_user',
    password: ''
  },
  emptyCredentials: {
    username: '',
    password: ''
  },
  uppercaseUsername: {
    username: 'STANDARD_USER',
    password: 'secret_sauce'
  },
  usernameWithWhitespace: {
    username: ' standard_user ',
    password: 'secret_sauce'
  }
} satisfies Record<string, LoginUser>;

export const loginErrors = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required'
};

export const negativeLoginCases = [
  {
    name: 'invalid credentials',
    user: users.invalid,
    expectedError: loginErrors.invalidCredentials
  },
  {
    name: 'valid username with wrong password',
    user: users.validUsernameWrongPassword,
    expectedError: loginErrors.invalidCredentials
  },
  {
    name: 'invalid username with valid password',
    user: users.invalidUsernameValidPassword,
    expectedError: loginErrors.invalidCredentials
  },
  {
    name: 'locked out user',
    user: users.lockedOut,
    expectedError: loginErrors.lockedOut
  },
  {
    name: 'missing username',
    user: users.emptyUsername,
    expectedError: loginErrors.usernameRequired
  },
  {
    name: 'missing password',
    user: users.emptyPassword,
    expectedError: loginErrors.passwordRequired
  },
  {
    name: 'missing username and password',
    user: users.emptyCredentials,
    expectedError: loginErrors.usernameRequired
  },
  {
    name: 'username casing does not match',
    user: users.uppercaseUsername,
    expectedError: loginErrors.invalidCredentials
  },
  {
    name: 'username contains extra whitespace',
    user: users.usernameWithWhitespace,
    expectedError: loginErrors.invalidCredentials
  }
];
