import trim from "validator/lib/trim";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import i18n from "./i18n";
import { validateMnemonic } from "./mnemonicSeed";

/*
DOCUMENTATION:

INPUTS PROPS ----------


*Required Props

*type=""
*name=""
minLength=""
maxLength=""
required

------------

Field: Name

E-mail: email
Alias:  alias
Username: username
E-mail or Username: emailUsername
Password: password
Password Repeat/Confirmation: passwordRepeat
Two Factor: 2FA

*/

export const inputValidator = inputs => {
  let errors = [];
  let inputName = [];
  let messageError = undefined;
  Object.keys(inputs).map(input => {
    if (!inputs[input]) {
      errors.push(input);
      messageError = i18n.t("MESSAGE_ERROR_EMPTY_FILEDS");
    }
  });

  if (!errors[0]) {
    Object.keys(inputs).map(input => {
      // Check if is undefined
      if (!inputs[input]) {
        errors.push(input);
      } else if (inputs[input].type === "checkbox") {
        let { checked, label, required } = inputs[input];
        if (required === true && checked === false) {
          messageError = i18n.t("MESSAGE_TERMS_OF_SERVICE");
          errors.push(label);
        }
      } else {
        let {
          name,
          value,
          required,
          placeholder,
          minLength,
          maxLength
        } = inputs[input];

        // Check if is empty
        if (required && isEmpty(trim(value.toString())))
          inputName.push(placeholder), errors.push(name);

        // Check length
        if (
          !isLength(trim(value.toString()), {
            min: minLength !== -1 ? minLength : 2,
            max: maxLength !== -1 ? maxLength : 128
          })
        )
          inputName.push(placeholder), errors.push(name);

        /* CUSTOM VALIDATIONS */

        // Check field of text
        if (name === "text") {
          if (isEmpty(trim(value.toString())))
            inputName.push(placeholder), errors.push(name);
        }
        // Check if is a valid email
        if (name === "email") {
          if (!isEmail(trim(value.toString())))
            inputName.push(placeholder), errors.push(name);
        }

        // Check if is a valid alias
        if (name === "alias" || name === "username") {
          let regex = new RegExp("^[a-z0-9-.@_]+$");

          if (
            !isLength(trim(value.toString()), {
              min: 4,
              max: 30
            }) ||
            !regex.test(trim(value.toString()))
          ) {
            inputName.push(placeholder);
            errors.push(name);
          }
        }

        // Check if is username or e-mail
        if (name === "emailUsername") {
          let regex = new RegExp("^[a-z0-9-.@_]+$");
          let error = 0;

          if (!isEmail(trim(value.toString()))) error += 1;

          if (
            !isLength(trim(value.toString()), {
              min: 4,
              max: 30
            }) ||
            !regex.test(trim(value.toString()))
          ) {
            error += 1;
          }

          if (error === 2) inputName.push(placeholder), errors.push(name);
        }

        if (name === "passwordRepeat") {
          let regex = new RegExp('^[a-zA-z0-9!@#$%^&*(),.?":{}|<>]+$');

          if (
            !isLength(trim(value.toString()), { min: 8, max: 64 }) ||
            !regex.test(trim(value.toString()))
          ) {
            errors.push(name);
            inputName.push(placeholder);
            messageError = i18n.t("RESET_NEW_PASSWORD_ERROR_1");
          }

          if (
            inputs["password"] &&
            value.toString() !== inputs["password"].value
          ) {
            errors.push(name);
            inputName.push(placeholder);
            messageError = i18n.t("RESET_NEW_PASSWORD_ERROR_2");
          }
        }

        if (name === "2FA" || name === "2fa") {
          let regex = new RegExp("^[0-9]+$");

          if (
            !isLength(trim(value.toString()), {
              min: 6,
              max: 6
            }) ||
            !regex.test(trim(value.toString()))
          ) {
            errors.push(name);
            inputName.push(placeholder);
          }
        }

        if (name === "seed") {
          let isSeed = validateMnemonic(value.toString());
          if (
            (value.trim().split(/\s+/g).length != 12 &&
              value.trim().split(/\s+/g).length != 18) ||
            !isSeed
          ) {
            errors.push(name);
          }
        }
      }
    });
  }

  // REMOVE DUPLICATE ITENS
  errors = errors.filter((item, index, input) => {
    return input.indexOf(item) == index;
  });

  inputName = inputName.filter((item, index, input) => {
    return input.indexOf(item) == index;
  });

  if (errors.length > 0 && messageError === undefined) {
    messageError = i18n.t("MESSAGE_ERROR_FILEDS") + inputName.join(", ");
  }

  return {
    messageError,
    errors
  };
};
