const getAllUnApprovedLoans = () => {
  let unApprovedLoans = [];
  const getExistingData = JSON.parse(localStorage.getItem('existingLoans'));
  if (getExistingData) {
    unApprovedLoans = getExistingData.filter((eachObj) => (eachObj.isActiveLoan && !eachObj.isApproved));
  }
  return {
    statusCode: 200,
    statusMessage: 'Loans fetched successfully!',
    loans: unApprovedLoans,
  };
};

const approveLoans = (requestBody) => {
  let customerExistingLoans = [];
  const getExistingData = JSON.parse(localStorage.getItem('existingLoans'));
  if (getExistingData) {
    customerExistingLoans = getExistingData.map((eachObj) => {
      const tempObj = eachObj;
      if (tempObj.loanId === requestBody.loanId) {
        tempObj.isApproved = true;
      }
      return tempObj;
    });
    // set new loans array
    localStorage.setItem('existingLoans', JSON.stringify(customerExistingLoans));
  }
  return {
    statusCode: 200,
    statusMessage: 'Loans Approved successfully!',
  };
};

export { getAllUnApprovedLoans, approveLoans };
