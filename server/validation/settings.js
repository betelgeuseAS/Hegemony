const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSettingsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (!Validator.isLength(data.name, { min: 6, max: 30 })) {
    errors.name = "Name length invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
