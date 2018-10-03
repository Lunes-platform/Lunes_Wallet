import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";

// UTILS
import { getUserSeedWords } from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import { getAuthToken } from "../../../utils/localStorage";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
import { convertToLocaleDate } from "../../../utils/strings";


// SERVICES
import PaymentService from "../../../services/paymentService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";

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
            address: coin.address
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

    const value = parseFloat(payload.pay.value);
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
    
    const data = {
      number: payload.pay.number,
      coin: payload.pay.coin,
      balance: convertBiggestCoinUnit(balance, 8),
      amount: convertBiggestCoinUnit(amount, 8),
      value: value.toFixed(2).replace(".", ","),
      assignor: payload.pay.assignor,
      name: payload.pay.name,
      dueDate: payload.pay.dueDate,
      description: payload.pay.description,
      cpfCnpj: payload.pay.cpfCnpj
    };

    yield put({
      type: "SET_PAYMENT_REDUCER",
      payload: data
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

    if (!response.hasOwnProperty('code') || response.code !== 200) {
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

export function* confirmPaySaga(payload) {
  try {
    yield put({
      type: "SET_LOADING_REDUCER",
      payload: true
    });

    const payload_transaction = {
      coin: payload.payment.coin,
      fromAddress: payload.payment.fromAddress,
      toAddress: payload.payment.toAddress,
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

      // pega o servico disponivel
      let lunesWallet = yield call(
        transactionService.transactionService,
        payload_transaction.coin,
        token
      );

      if (lunesWallet) {
        // transaciona
        let response = yield call(
          transactionService.transaction,
          lunesWallet.id,
          payload_transaction,
          lunesWallet,
          decryptAes(seed, payload.payment.user),
          token
        );

        const transacao_obj = JSON.parse(response.config.data);
        const dueDate = payload.payment.payment.dueDate.split("/");
        const dueDateFormat = dueDate.reverse().join('-');

        const dataIso = new Date(dueDateFormat).toISOString();

        if (response) {
          const payload_elastic = {
            barCode: payload.payment.payment.number,
            dueDate: dataIso,
            amount: parseFloat(payload.payment.payment.value),
            name: payload.payment.payment.name,
            document: payload.payment.payment.cpfCnpj,
            txID: transacao_obj.txID,
            describe: payload.payment.payment.description,
            serviceId: payload.payment.payment.coin.id
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
