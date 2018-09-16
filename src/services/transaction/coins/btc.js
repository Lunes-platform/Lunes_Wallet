import _ from "lodash";
import bitcoin from "bitcoinjs-lib";
import coinSelect from "coinselect";
import bip39 from "bip39";

import TransactionService from "../transactionService";

class BtcTransaction {
  getKeyPair(mnemonic, networks) {
    const hdNode = bitcoin.HDNode.fromSeedHex(
      bip39.mnemonicToSeedHex(mnemonic),
      networks.bitcoinjsNetwork
    );

    return hdNode.derivePath(networks.derivePath + "/0");
  }

  async createTransaction(data) {
    try {
      const transService = new TransactionService();
      const utxos = await transService.utxo(
        data.toAddress,
        data.coin,
        data.token
      );

      console.warn(data, utxos);

      const targets = [
        {
          address: data.lunesWallet.address,
          value: data.feeLunes
        },
        {
          address: data.toAddress,
          value: data.amount
        }
      ];

      let { inputs, outputs } = coinSelect(utxos, targets, data.feePerByte);

      let tx = new bitcoin.TransactionBuilder(data.network.bitcoinjsNetwork);
      console.warn("inputs, outputs", inputs, outputs);
      outputs.forEach(output => {
        if (!output.address) {
          output.address = data.fromAddress;
        }

        tx.addOutput(output.address, output.value);
      });

      inputs.forEach(input => {
        tx.addInput(input.txId, input.vout);
      });

      let keyPair = this.getKeyPair(data.seed, data.network);

      tx = this.sign(tx, keyPair);

      const txHex = tx.build().toHex();
      // return;
      const broadcastResult = await transService.broadcast(
        txHex,
        data.coin,
        data.token
      );

      console.warn("broadcastResult", broadcastResult);

      return broadcastResult.data.data.txId;
    } catch (error) {
      console.warn(error);
      return "error";
    }
  }

  sign(tx, keyPair) {
    _.times(tx.inputs.length, i => tx.sign(i, keyPair));
    return tx;
  }
}

export default BtcTransaction;
