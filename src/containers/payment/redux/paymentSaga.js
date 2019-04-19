import { put, call } from "redux-saga/effects";
import {
  internalServerError,
  modalError
} from "../../errors/statusCodeMessage";

// UTILS
import { getUserSeedWords } from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import { getAuthToken } from "../../../utils/localStorage";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
import { convertToLocaleDate } from "../../../utils/strings";
import i18n from "../../../utils/i18n";

// SERVICES
import PaymentService from "../../../services/paymentService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transactionService";

const paymentService = new PaymentService();
const coinService = new CoinService();
const transactionService = new TransactionService();

export function* setModalStepSaga(payload) {
  yield put({
    type: "SET_MODAL_PAY_STEP_REDUCER",
    step: payload.step
  });
}

export function* getCoinsEnabledSaga() {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getCoins, token);

    const services = response.data.services;

    const coins = services.reduce((availableCoins, coin) => {
      if (coin.status === "active") {
        const active = {
          title: coin.abbreviation.toUpperCase(),
          value: {
            id: coin.id,
            abbreviation: coin.abbreviation,
            address: coin.address,
            limit: coin.limit
          },
          img: "/images/icons/coins/" + coin.abbreviation + ".png"
        };

        availableCoins.push(active);
      }

      return availableCoins;
    }, []);

    yield put({
      type: "GET_COINS_REDUCER",
      coins: coins
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* setPaymentSaga(payload) {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    let data = {};
    const value = parseFloat(payload.pay.value);

    if (payload.pay.servicePaymentMethodId === 3) {

      const { abbreviation } = payload.pay.coin;
      const token = yield call(getAuthToken);

      const amountResponse = yield call(
        paymentService.getCoinAmountPay,
        token,
        abbreviation,
        value
      );

      const balanceResponse = yield call(
        coinService.getCoinBalance,
        abbreviation,
        payload.pay.address,
        token
      );

      const balance = balanceResponse.data.data.available;
      const amount = amountResponse.data.data.value;
      const decimalPoint = payload.pay.decimalPoint;

      data = {
        number: payload.pay.number,
        coin: payload.pay.coin,
        balance: convertBiggestCoinUnit(balance, decimalPoint),
        amount: convertBiggestCoinUnit(amount, decimalPoint),
        value: value,
        assignor: payload.pay.assignor,
        name: payload.pay.name,
        dueDate: payload.pay.dueDate,
        description: payload.pay.description,
        cpfCnpj: payload.pay.cpfCnpj,
        servicePaymentMethodId: payload.pay.servicePaymentMethodId,
        serviceCoinId: payload.pay.serviceCoinId
      };
    } else {
      data = {
        number: payload.pay.number,
        coin: payload.pay.coin,
        balance: value,
        amount: value,
        value: value + (value / 100), //1%
        assignor: payload.pay.assignor,
        name: payload.pay.name,
        dueDate: payload.pay.dueDate,
        description: payload.pay.description,
        cpfCnpj: payload.pay.cpfCnpj,
        servicePaymentMethodId: payload.pay.servicePaymentMethodId,
        serviceCoinId: payload.pay.serviceCoinId
      };
    }
    yield put({
      type: "SET_PAYMENT_REDUCER",
      payload: data
    });
    yield put({
      type: "SET_CLEAR_PAYMENT_REDUCER"
    });    
  } catch (error) {
    yield put(internalServerError());
    yield put({
      type: "CHANGE_SKELETON_ERROR_STATE",
      state: true
    });
    return;
  }
}

export function* getFeePaymentSaga(payload) {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    let response = yield call(
      coinService.getFee,
      payload.coin,
      payload.fromAddress,
      payload.toAddress,
      payload.amount,
      payload.decimalPoint
    );

    if (!response.fee) {
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });
      yield put(internalServerError());
    }

    yield put({
      type: "GET_FEE_PAYMENT_REDUCER",
      fee: response
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* setFeePaymentSaga(payload) {
  yield put({
    type: "SET_FEE_PAYMENT_REDUCER",
    fee: payload
  });
}

export function* getInvoiceSaga(payload) {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getInvoice, token, payload.number);

    if (response.error) {
      yield put(response.error);
      yield put({ type: "SET_CLEAR_PAYMENT_REDUCER" });
    } else if (!response.data) {
      yield put(internalServerError());
    }

    if (!response.hasOwnProperty("code") || response.code !== 200) {
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });

      yield put({
        type: "SET_PAYMENT_INVOICE_ERROR"
      });
      return;
    }

    const data = {
      error: false,
      number: payload.number,
      value: response.data.value,
      assignor: response.data.assignor,
      dueDate: response.data.dueDate
        ? convertToLocaleDate(response.data.dueDate)
        : ""
    };

    yield put({
      type: "GET_INVOICE_REDUCER",
      payment: data
    });
  } catch (error) {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: false
    });
    yield put(internalServerError());
  }
}

export function* getHistoryPaySaga() {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getHistory, token);

    if (response === "ERRO") {
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });
      yield put(internalServerError());
    }

    let data = [];
    if (response.payments) {
      data = response.payments;
    }

    yield put({
      type: "GET_HISTORY_PAY_REDUCER",
      history: data
    });
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* uploadBarcodeSaga(payload) {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    let token = yield call(getAuthToken);
    let response = yield call(paymentService.getBarcode, payload.image);

    if (!response || !response.data) {
      if (!response) {
        yield put(modalError(i18n.t("PAYMENT_MESSAGE_BARCODE")));
      } else {
        yield put(modalError(response.message));
      }

      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });
      return;
    }

    let getBoletoInfo = yield call(
      paymentService.getInvoice,
      token,
      response.data
    );

    const data = {
      error: false,
      number: response.data,
      value: getBoletoInfo.data.value,
      assignor: getBoletoInfo.data.assignor,
      dueDate: getBoletoInfo.data.dueDate
        ? convertToLocaleDate(getBoletoInfo.data.dueDate)
        : ""
    };

    yield put({
      type: "GET_INVOICE_REDUCER",
      payment: data
    });

    yield put({
      type: "GET_PAYMENT_DATA_REDUCER",
      number: response.data
    });

    yield put({
      type: "SET_LOADING_REDUCER",
      payload: false
    });
  } catch (error) {
    yield put(internalServerError());
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: false
    });
  }
}

export function* confirmPaySaga(payload) {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });
    const payloadTransaction = {
      coin: payload.payment.coin,
      fromAddress: payload.payment.fromAddress,
      toAddress: payload.payment.toAddress,
      lunesUserAddress: payload.payment.lunesUserAddress,
      amount: payload.payment.amount,
      fee: payload.payment.fee,
      feePerByte: payload.payment.feePerByte,
      feeLunes: payload.payment.feeLunes,
      price: payload.payment.price,
      decimalPoint: payload.payment.decimalPoint
    };

    try {
      let seed = yield call(getUserSeedWords);
      let token = yield call(getAuthToken);
      let lunesWallet = null;
      let response = null;
      if (payload.payment.servicePaymentMethodId !== 4) {
        // pega o servico disponivel
        lunesWallet = yield call(
          transactionService.invoiceService,
          payloadTransaction.coin,
          token
        );
      }
      if (lunesWallet || payload.payment.servicePaymentMethodId === 4) {
        if (lunesWallet) {
          // transaciona
          response = yield call(
            transactionService.transaction,
            lunesWallet.id,
            payloadTransaction,
            lunesWallet,
            decryptAes(seed, payload.payment.user),
            token
          );
        }

        const transacao_obj = response ? JSON.parse(response.config.data): null;
        const dueDate = payload.payment.payment.dueDate.split("/");
        const dueDateFormat = dueDate.reverse().join("-");
        const dataIso = new Date(dueDateFormat).toISOString();
        if (response || payload.payment.servicePaymentMethodId === 4) {
          
            const payload_elastic = {
              barCode: payload.payment.payment.number,
              dueDate: dataIso,
              amount: payload.payment.payment.value,
              name: payload.payment.payment.name,
              document: payload.payment.payment.cpfCnpj,
              txID: response ? transacao_obj.txID : null,
              describe: payload.payment.payment.description,
              serviceId: response ? payload.payment.payment.coin.id : payload.payment.serviceCoinId,
              servicePaymentMethodId: payload.payment.servicePaymentMethodId,
              userLunesAddress: payload.payment.lunesUserAddress
            };

            // chamar api pra salvar a transacao
            let response_elastic = yield call(
              paymentService.sendPay,
              token,
              payload_elastic
            );

            yield put({
              type: "SET_CLEAR_PAYMENT_REDUCER"
            });

            if (response_elastic.data.errorMessage) {
              yield put({
                type: "SET_MODAL_PAY_STEP_REDUCER",
                step: 6
              });
              yield put(internalServerError());
            } else {
              yield put({
                type: "SET_MODAL_PAY_STEP_REDUCER",
                step: 5
              });
            }

            return;
          }        
      }
      yield put({
        type: "SET_CLEAR_PAYMENT_REDUCER"
      });

      yield put({
        type: "SET_MODAL_PAY_STEP_REDUCER",
        step: 5
      });

      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });

      yield put({
        type: "SET_MODAL_PAY_STEP_REDUCER",
        step: 6
      });

      yield put(internalServerError());

      return;
    } catch (error) {
      yield put({
        type: "SET_LOADING_REDUCER",
        payload: false
      });

      yield put({
        type: "SET_MODAL_PAY_STEP_REDUCER",
        step: 6
      });

      yield put(internalServerError());
    }
  } catch (error) {
    yield put(internalServerError());
  }
}
