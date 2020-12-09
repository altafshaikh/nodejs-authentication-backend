const sendErrorMessage = (error, req, res) => {
  console.log(error);
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = sendErrorMessage;
