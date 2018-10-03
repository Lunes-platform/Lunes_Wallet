const initialState = {
  selectedCoin: undefined,
  isBalanceLoading: false,
  isTxHistoryLoading: false,
  assets: [],
  history: [],
};

const asset = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ASSET_DATA":
      return {
        ...state,
        isBalanceLoading: action.isBalanceLoading,
        isTxHistoryLoading: action.isTxHistoryLoading,
        assets: action.assets ? action.assets : state.assets
      }

    case "SET_ASSET_HISTORY":
      return {
        ...state,
        isTxHistoryLoading: action.isTxHistoryLoading,
        history: action.history ? action.history : []
      }

    case "ASSETS_SET_SELECTED_COIN":
      return {
        ...state,
        selectedCoin: action.assetId,
        loading: false
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default asset;
