exports.success = (code, message, data) => {
  return {
    code: code,
    message: message,
    data: data,
  };
};

exports.error = (code, message) => {
  return {
    code: code,
    message: message,
  };
};

exports.successDelete = (code, message) => {
  return {
    code: code,
    message: message,
  };
};

exports.errorDelete = (code, message) => {
  return {
    code: code,
    message: message,
  };
};

exports.successSignUp = (code, message) => {
  return {
    code: code,
    message: message,
  };
};

exports.successSignIn = (code, message, token) => {
  return {
    code: code,
    message: message,
    token: token,
  };
};

exports.errorAuth = (code, message) => {
  return {
    code: code,
    message: message,
  };
};
