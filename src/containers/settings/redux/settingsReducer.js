const initialState = {
  security: {
    urlImage: undefined
  },
  wallet: {
    modalAlias: false,
    loadingAlias: false
  },
  loading: false,
  errors: [],
  payload: {},
  upload: {},
  loadingKyc: false,
  loadingCreate: false,
  loadingState: false,
  loadingAddress: false,
  location: {
    countries: [],
    states: [],
    city: []
  },
  cepValidation: {cep: true},
  sendRequest: 0,
  kyc: {},
  loadingP2P: false,
  signatures: [],
  signature: {},
  mySignature: {},
  fee: {
    fee: {
      low: 0,
      medium: 0,
      high: 0
    }
  },
  address: {},
  p2pPackage: {
    fee: {
      fee: 0,
      feePerByte: 0,
      feeLunes: 0
    },
    idpack: "", // o pacote escolhido
    coin: {
      id: "",
      address: "",
      abbreviation: ""
    },
    paycoin: "", // moeda usada pra pagar
    paycoinid: "", // id da moeda usada pra pagar
    amountFiat: "", // qtde em fiat a pagar
    amountPay: "", // qtde a pagar
    balance: "", // o balance do usuario de moeda pra pagar
    amount: "", // qtde a receber
    operator: "",
    address: "", // endereco para enviar o pgto
    receiveAddress: "" // endereco onde o usuario vai receber a moeda comprada
  }
};

const settings = (state = initialState, action) => {
  
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state
      };

    case "CHANGE_LOADING_SETTINGS":
      return {
        ...state,
        loading: !state.loading
      };

    case "POST_SETTINGS_CREATE_2FA":
      return {
        ...state,
        security: {
          urlImage: action.urlQrCode,
          uriQrCode: action.uri
        },
        loading: !state.loading
      };

    case "SET_WALLET_ALIAS_MODAL_OPEN":
      return {
        ...state,
        wallet: {
          modalAlias: !state.wallet.modalAlias,
          loadingAlias: false
        }
      };

    case "SET_WALLET_ALIAS_LOADING":
      return {
        ...state,
        wallet: {
          modalAlias: state.wallet.modalAlias,
          loadingAlias: action.state ? true : false
        }
      };
    case "GET_KYC_REDUCER":
      return {
        ...state,
        kyc: action.kyc
      };

    case "SET_LOADING_KYC":
      return {
        ...state,
        loadingKyc: action.loadingKyc
      };
    case "SET_LOADING_CREATE_KYC":
      return {
        ...state,
        loadingCreate: action.loadingCreate
      };

    case "KYC_CREATE_REDUCER":
      return {
        ...state,
        payload: action.payload,
        loadingCreate: false
      };

    case "KYC_UPLOAD_REDUCER":
      return {
        ...state,
        upload: action.upload,
        loadingKyc: false
      };
    case "KYC_SET_COUNTRIES":
      return {
        ...state,
        location: {
          ...state.location,
          countries: action.response.data
        }
      };
    case "KYC_SET_STATE":
      return {
        ...state,
        location: {
          ...state.location,
          states: action.response.data
        },
        loadingState: false
      };
    case "KYC_SET_CITY":
      return {
        ...state,
        location: {
          ...state.location,
          city: action.response.data
        },
        loadingCity: false
      };
    case "SET_LOADING_STATE":
      return {
        ...state,
        loadingState: true
      };
    case "SET_LOADING_ADDRESS":
      return {
        ...state,
        loadingAddress: true
      };
    case "SET_CEP_VALIDATION_INFORMATION":
    return {
      ...state,
      cepValidation: action.response,
      loadingAddress: false
    };
    case "COUNT_KYC_SEND_REQUEST":
      return {
        ...state,
        sendRequest: state.sendRequest + 1
      };

    case "SET_LOADING_P2P":
      return {
        ...state,
        loadingP2P: action.loadingP2P
      };

    case "SET_LOADING_REDUCER":
      return {
        ...state,
        loading: action.loading
      };

    case "GET_SIGNATURES_P2P_REDUCER":
      return {
        ...state,
        signatures: action.signatures,
        loadingP2P: false
      };

    case "GET_SIGNATURE_P2P_REDUCER":
      return {
        ...state,
        mySignature: action.mySignature,
        loadingP2P: false
      };

    case "SET_SIGNATURE_P2P":
      return {
        ...state,
        signature: action.signature
      };

    case "GET_FEE_P2P_REDUCER":
      return {
        ...state,
        fee: action.fee,
        loading: false
      };

    case "SET_FEE_P2P_REDUCER":
      return {
        ...state,
        p2pPackage: {
          ...state.p2pPackage,
          fee: action.fee
        }
      };
    case "SET_CLEAR_SETTINGS_REDUCER":
      return {
        ...initialState
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default settings;
