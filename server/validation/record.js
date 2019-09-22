const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRecord(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  // Address checks
  // if (Validator.isEmpty(data.address)) {
  //   errors.address = "Address field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};