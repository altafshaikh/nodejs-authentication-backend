const sendResponse = (statusCode, status, data, req, res) => {
  if (data.length) {
    res.status(statusCode).json({ status: status, data: [data] });
  } else {
    res.status(statusCode).json({ status: status });
  }
};

module.exports = sendResponse;
