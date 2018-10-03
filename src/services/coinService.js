import axios from "axios";
import CAValidator from "cryptocurrency-address-validator";

// CONSTANTS
import {
  BASE_URL,
  LUNESNODE_URL,
  API_HEADER,
  HEADER_RESPONSE,
  TESTNET
} from "../constants/apiBaseUrl";

// ERROR
import {
  internalServerError
} from "../containers/errors/statusCodeMessage";

// UTILS
import {
  getDefaultCrypto,
  setDefaultCrypto,
  setAuthToken
} from "../utils/localStorage";
import {
  convertBiggestCoinUnit,
  percentCalc,
  convertSmallerCoinUnit
} from "../utils/numbers";
import i18n from "../utils/i18n.js";

let getPriceHistory = async (coiName, token) => {
  try {
    let coinService = new CoinService();
    let prices = {
      initial: 0.01,
      last: 0.01
    };
    let priceHistories = await coinService.getCoinPriceHistory(
      coiName,
      "usd",
      "1_D",
      null,
      token
    );

    if (!priceHistories.data.data) return prices;

    setAuthToken(priceHistories.headers[HEADER_RESPONSE]);

    let maxHistories = priceHistories.data.data.history.length - 1;
    prices.initial = priceHistories.data.data.history[0].price;
    prices.last = priceHistories.data.data.history[maxHistories].price;

    return prices;
  } catch (error) {
    internalServerError();
    return;
  }
};

class CoinService {
  async getGeneralInfo(token, seed) {
    try {
      API_HEADER.headers.Authorization = token;
      let coins = [];
      let defaultCrypto = await getDefaultCrypto();
      let responseAvailableCoins = await axios.get(
        BASE_URL + "/coin",
        API_HEADER
      );
      let availableCoins = responseAvailableCoins.data.data.coins;
      const promises = availableCoins.map(async (coin, index) => {
        // CHECK ACTIVE DEFAULT COIN
        if (defaultCrypto === coin.abbreviation && coin.status !== "active") {
          let coin = availableCoins[index + 1] ?
            availableCoins[index + 1].abbreviation :
            availableCoins[index - 1].abbreviation;
          setDefaultCrypto(coin);
        }

        availableCoins[index].coinHistory = undefined;

        if (coin.status === "active") {
          let responsePrice = await axios.get(
            BASE_URL + "/coin/" + coin.abbreviation + "/price",
            API_HEADER
          );
          availableCoins[index].price = responsePrice.data.data;
          availableCoins[index].price.BRL.symbol = "R$";
          availableCoins[index].price.USD.symbol = "$";
          availableCoins[index].price.EUR.symbol = "€";
          availableCoins[index].price.percent = percentCalc(1, 3) + "%"; //CALCULAR PORCENTAGEM

          // CREATE ADDRESS
          let responseCreateAddress = await axios.post(
            BASE_URL + "/coin/" + coin.abbreviation + "/address", {
              seed
            },
            API_HEADER
          );

          if (
            responseCreateAddress.data.data &&
            responseCreateAddress.data.data.address
          ) {
            availableCoins[index].address =
              responseCreateAddress.data.data.address;
          } else {
            availableCoins[index].status = "inactive";
            availableCoins[index].address = undefined;
          }

          // GET PRICE
          let priceHistory = await getPriceHistory(coin.abbreviation, token);

          if (responsePrice.data.data) {
            availableCoins[index].price = responsePrice.data.data;
            availableCoins[index].price.percent =
              percentCalc(priceHistory.initial, priceHistory.last) + "%";
          } else {
            availableCoins[index].status = "inactive";
            availableCoins[index].price = undefined;
          }

          // GET BALANCE
          let responseBalance = await axios.get(
            BASE_URL +
            "/coin/" +
            coin.abbreviation +
            "/balance/" +
            coin.address,
            API_HEADER
          );

          if (responseBalance.data.data) {
            availableCoins.token = responseBalance.headers[HEADER_RESPONSE];
            availableCoins[index].balance = responseBalance.data.data;

            // BALANCE CONVERTER
            availableCoins[index].balance.available = convertBiggestCoinUnit(
              availableCoins[index].balance.available,
              coin.decimalPoint
            );

            availableCoins[index].balance.total = convertBiggestCoinUnit(
              availableCoins[index].balance.total,
              coin.decimalPoint
            );

            Object.keys(availableCoins[index].price).map(fiat => {
              let fiatPrice = availableCoins[index].price[fiat];
              availableCoins[index].balance[fiat] =
                fiatPrice.price * availableCoins[index].balance.available;
            });
          } else {
            availableCoins[index].status = "inactive";
            availableCoins[index].balance = undefined;
          }
        } else {
          availableCoins[index].address = undefined;
          availableCoins[index].balance = undefined;
        }
      });

      /* eslint-disable */
      await Promise.all(promises);
      /* eslint-enable */

      availableCoins.map(async (coin, index) => {
        coins[coin.abbreviation] = availableCoins[index];
      });
      setAuthToken(availableCoins.token);
      coins.token = availableCoins.token;
      return coins;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getAvailableCoins(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/coin", API_HEADER);
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinBalance(coinName, address, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL + "/coin/" + coinName + "/balance/" + address,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinPrice(coinType, fiat, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL + "/coin/" + coinType + "/price/" + fiat,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinPriceHistory(coinType, fiat, range, interval, token) {
    try {
      range = range.split("_");
      let fromDateIso = "";
      let date = new Date();
      let toDateIso = new Date().toISOString();
      let value = range[0];
      let typeValue = range[1];
      const day = 1440;
      const week = 10080;
      const mounth = 43200;
      const year = 525600;

      switch (typeValue.toLowerCase()) {
        case "d":
          fromDateIso = new Date(
            date.getTime() - value * day * 60000
          ).toISOString();

          break;

        case "w":
          fromDateIso = new Date(
            date.getTime() - value * week * 60000
          ).toISOString();

          break;

        case "m":
          fromDateIso = new Date(
            date.getTime() - value * mounth * 60000
          ).toISOString();

          break;

        case "y":
          fromDateIso = new Date(
            date.getTime() - value * year * 60000
          ).toISOString();
          break;
      }

      API_HEADER.headers.Authorization = token;
      interval = !interval ? 60 : interval;
      let response = await axios.get(
        `${BASE_URL}/coin/${coinType}/history/${fiat}?from=${fromDateIso}&to=${toDateIso}&interval=${interval}`,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async createWalletCoin(coinType, seed, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/coin/" + coinType + "/address", {
          seed
        },
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getCoinHistory(coin, address, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL +
        "/coin/" +
        coin +
        "/transaction/history/" +
        address +
        "?size=100",
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response.data.data;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async validateAddress(coin, address) {
    try {
      let valid = false;

      if (coin === "usdt") coin = "btc" // USDT/TETHER address === BTC address

      if (!coin || !address || address.length < 10) {
        return "error";
      }

      if (coin === "lunes" || coin === "LUNES") {
        let response = await axios.get(
          LUNESNODE_URL + "/addresses/validate/" + address
        );

        if (!response.data.valid) {
          return "error";
        }

        return response.data.valid;
      }

      if (TESTNET) {
        valid = await CAValidator.validate(
          address,
          coin.toUpperCase(),
          "testnet"
        );
      } else {
        valid = await CAValidator.validate(address, coin.toUpperCase());
      }

      if (!valid) {
        return "error";
      }

      return valid;
    } catch (er) {
      let error = {
        error: internalServerError(),
        er: er
      };
      return error;
    }
  }

  async shareCoinAddress(coinName, coinAddress) {
    try {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: coinName + ":" + coinAddress,
          url: window.location.href
        });
      }
    } catch (error) {
      internalServerError();
    }
  }

  async getFee(coinName, fromAddress, toAddress, amount, decimalPoint = 8) {
    try {
      let fee = {};
      let feePerByte = {};
      let feeLunes = {};

      //API_HEADER.headers.Authorization = token;

      amount = convertSmallerCoinUnit(amount, decimalPoint);

      let response = await axios.post(
        BASE_URL + "/coin/" + coinName + "/transaction/fee", {
          fromAddress,
          toAddress,
          amount
        },
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      let dataFee = response.data.data.fee;
      let dataFeePerByte = response.data.data.feePerByte;
      let dataFeeLunes = response.data.data.feeLunes;

      if (response.data.code === 200) {
        Object.keys(dataFee).map(value => {
          fee[value] = convertBiggestCoinUnit(dataFee[value], decimalPoint);
        });

        Object.keys(dataFeePerByte).map(value => {
          feePerByte[value] = dataFeePerByte[value];
        });

        Object.keys(dataFeeLunes).map(value => {
          feeLunes[value] = dataFeeLunes[value];
        });
      }

      fee = {
        fee,
        feePerByte,
        feeLunes
      };
      return fee;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async saveTransaction(
    serviceId,
    feeLunes,
    transaction,
    coin,
    price,
    describe,
    token
  ) {
    try {
      API_HEADER.headers.Authorization = token;
      let transactionData = {
        serviceId: serviceId,
        feeLunes: feeLunes,
        txID: transaction.id,
        from: transaction.sender,
        to: transaction.recipient,
        amount: transaction.amount,
        fee: transaction.fee,
        describe: describe ? describe : null,
        price: {
          USD: price ? price.USD.price : undefined,
          EUR: price ? price.EUR.price : undefined,
          BRL: price ? price.BRL.price : undefined
        }
      };

      let response = await axios.post(
        BASE_URL +
        "/coin/" +
        coin +
        "/transaction/history/" +
        transaction.sender,
        transactionData,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);

      return response;
    } catch (error) {
      console.warn(error, error.response);
      internalServerError();
    }
  }

  async getVoucherCoin(phone, voucher, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(
        BASE_URL +
        "/voucher/" +
        voucher +
        "?ddi=" +
        55 +
        "&ddd=" +
        phone[0] +
        "&phone=" +
        phone[1],
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (!response.data.code || response.data.code !== 200) {
        return;
      }

      return response.data.data.coin;
    } catch (error) {
      internalServerError();
    }
  }

  async voucherRescue(phone, address, voucher, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/voucher/rescue/" + voucher, {
          ddi: 55,
          ddd: phone[0],
          phone: phone[1],
          address: address
        },
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (!response.data.code || response.data.code !== 200) {
        return;
      }

      return response;
    } catch (error) {
      internalServerError();
    }
  }

  async verifyCoupon(coupon, token) {
    try {
      let endpoint = BASE_URL + "/coupon/rescue/" + coupon;

      API_HEADER.headers.Authorization = token;

      API_HEADER.validateStatus = function () {
        return true;
      };

      let {
        data,
        headers
      } = await axios.post(endpoint, {}, API_HEADER);

      let errorMessage = {};
      if (data.errorMessage) {
        errorMessage = JSON.parse(data.errorMessage);
      }

      let status = parseInt(headers.status);
      let code = parseInt(errorMessage.code) || parseInt(data.code);

      if (status != 200 && code != 200) {
        let message;
        if (status === 403 || code === 403)
          message = i18n.t("COUPON_USER_NOT_AUTHORIZED");
        else if (status == 401 || code == 401)
          message = i18n.t("COUPON_INVALID");
        else if (
          (status && status.toString().startsWith("5")) ||
          (code && code.toString().startsWith("5"))
        )
          message = i18n.t("COUPON_SERVER_ERROR");
        else message = i18n.t("COUPON_UNKNOWN_ERROR_1");
        return {
          type: "error",
          data: {
            message: message
          }
        };
      }

      return {
        type: "success",
        data: {
          message: data.message
        }
      };
    } catch (error) {
      console.warn(error);
      internalServerError();
      return {
        type: "error",
        data: {
          message: typeof error === "string" ?
            error :
            error.message || i18n.t("COUPON_UNKNOWN_ERROR_2")
        }
      };
    }
  }
}

export default CoinService;