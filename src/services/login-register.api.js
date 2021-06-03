const registerUser = (requestBody) => {
  let statusCode = 403;
  let statusMessage = 'Server Error, Please try again in sometime';
  if (!localStorage.getItem('usersInfoArray')) {
    localStorage.setItem('usersInfoArray', JSON.stringify([]));
  }
  const getExistingData = JSON.parse(localStorage.getItem('usersInfoArray'));
  const exists = getExistingData.some((eachObj) => eachObj.phoneNumber === requestBody.phoneNumber);
  if (!exists) {
    getExistingData.push(requestBody);
    localStorage.setItem('usersInfoArray', JSON.stringify(getExistingData));
    statusCode = 201;
    statusMessage = 'User Registered Successfully, Please login to apply for loans in seconds!';
  } else {
    statusCode = 403;
    statusMessage = 'Phone Number is already Registered, Please try signing in.';
  }
  return {
    status: statusCode,
    statusMessage,
  };
};

const login = (requestBody) => {
  const responseObj = {
    statusCode: 500,
    statusMessage: 'Server Error, Please try again in sometime',
  };
  const getExistingData = JSON.parse(localStorage.getItem('usersInfoArray'));
  const checkUser = getExistingData.filter((eachObj) => (eachObj.phoneNumber === requestBody.phoneNumber && eachObj.password === requestBody.password));
  if (checkUser.length === 1) {
    responseObj.statusCode = 200;
    responseObj.statusMessage = 'Logged in Successfully';
    responseObj.userData = { ...checkUser };
  } else {
    responseObj.statusCode = 401;
    responseObj.statusMessage = 'Invalid Credentials';
  }
  return responseObj;
};

const checkUserSession = () => {
  const responseObj = {
    statusCode: 500,
    statusMessage: 'Server Error, Please try again in sometime',
  };
  const getExistingLogginedData = JSON.parse(localStorage.getItem('loginnedUser'));
  if (getExistingLogginedData) {
    responseObj.statusCode = 200;
    responseObj.statusMessage = 'Logged in Successfully';
    responseObj.userData = { ...getExistingLogginedData };
  } else {
    responseObj.statusCode = 401;
    responseObj.statusMessage = 'Invalid Session!';
  }
  return responseObj;
};

const Logout = () => {
  const responseObj = {
    statusCode: 500,
    statusMessage: 'Server Error, Please try again in sometime',
  };
  localStorage.removeItem('loginnedUser');
  const getExistingLogginedData = JSON.parse(localStorage.getItem('loginnedUser'));
  if (!getExistingLogginedData) {
    responseObj.statusCode = 200;
    responseObj.statusMessage = 'Logged out Successfully';
  } else {
    responseObj.statusCode = 401;
    responseObj.statusMessage = 'Invalid Session!';
  }
  return responseObj;
};

export {
  registerUser, login, checkUserSession, Logout,
};
