const generateAuthError = (message) => {
	switch (message) {
	  case 'EMAIL_EXISTS':
		return 'User with this email already exists';
	  case 'USER_DISABLED':
		return 'User account is disabled by the administrator';
	  case 'EMAIL_NOT_FOUND':
	  case 'INVALID_PASSWORD':
	  case 'INVALID_EMAIL':
		return 'Wrong email or password';
	  default:
		return 'Too many entry attempts, try again later';
	}
  };
  
  export default generateAuthError;
  