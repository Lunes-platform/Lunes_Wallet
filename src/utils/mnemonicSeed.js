import bip39 from "bip39";

export const generateMnemonic = () => bip39.generateMnemonic();

export const validateMnemonic = mnemonic => bip39.validateMnemonic(mnemonic);
