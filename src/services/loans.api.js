const createLoan = (requestBody) => {
  if (!localStorage.getItem('existingLoans')) {
    localStorage.setItem('existingLoans', JSON.stringify([]));
  }
  const getExistingData = JSON.parse(localStorage.getItem('existingLoans'));
  getExistingData.push(requestBody);
  localStorage.setItem('existingLoans', JSON.stringify(getExistingData));
  return {
    statusCode: 201,
    statusMessage: 'Loan Applied Successfully. We will get back to you at the earliest',
  };
};

const getCustomerUnpaidLoans = (requestBody) => {
  let customerExistingLoans = [];
  const getExistingData = JSON.parse(localStorage.getItem('existingLoans'));
  if (getExistingData) {
    customerExistingLoans = getExistingData.filter((eachObj) => (eachObj.phoneNumber === requestBody.phoneNumber && eachObj.isActiveLoan && eachObj.isApproved));
  }
  return {
    statusCode: 200,
    statusMessage: 'Loans fetched successfully!',
    loans: customerExistingLoans,
  };
};

const clearCustomerLoans = (requestBody) => {
  let customerExistingLoans = [];
  const getExistingData = JSON.parse(localStorage.getItem('existingLoans'));
  if (getExistingData) {
    customerExistingLoans = getExistingData.map((eachObj) => {
      const tempObj = eachObj;
      if (tempObj.loanId === requestBody.loanId) {
        tempObj.isActiveLoan = false;
      }
      return tempObj;
    });
    // set new loans array
    localStorage.setItem('existingLoans', JSON.stringify(customerExistingLoans));
  }
  return {
    statusCode: 200,
    statusMessage: 'Loans Cleared successfully!',
  };
};

export { createLoan, getCustomerUnpaidLoans, clearCustomerLoans };
