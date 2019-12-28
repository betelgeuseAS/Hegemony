const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRecord(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Content checks
  // if (Validator.isEmpty(data.content)) {
  //   errors.content = "Content field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
