const type = "REQUEST_FAILED";
const typeSuccess = "REQUEST_SUCCESS";

export const internalServerError = () => ({
  type,
  message:
    "Your request could not be completed. Check your connection or try again later"
});

export const unauthorized = message => ({
  error: {
    type,
    message
  }
});

export const badRequest = message => ({
  error: {
    type,
    message
  }
});

export const forbidden = message => ({
  error: {
    type,
    message
  }
});

export const modalError = message => ({
  type,
  message
});

export const modalSuccess = message => ({
  type: typeSuccess,
  message
});
