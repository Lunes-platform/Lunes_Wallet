export const clearMessage = () => ({
  type: "CLEAR_MESSAGE"
});

export const errorInput = value => ({
  type: "ERROR_INPUT",
  message: value
});

export const errorRequest = value => ({
  type: "REQUEST_FAILED",
  message: value
});

export const successRequest = value => ({
  type: "REQUEST_SUCCESS",
  message: value
});
