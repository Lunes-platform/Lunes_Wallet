const ASSETS = {
  //_lunesfullnode
  "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": {
    assetId: "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8",
    name: "ZEN Token",
    icon: "fullnode-token.png",
    abbreviation: "ZEN",
  },
  //_odyx.me
  "3NjPCAdGhPPWs8bJjauAjuRHRuzsgicA58J1fAF3q89J": {
    assetId: "3NjPCAdGhPPWs8bJjauAjuRHRuzsgicA58J1fAF3q89J",
    name: "OPN Token",
    icon: "odyx-token.png",
    abbreviation: "OPN",
  },
  "FaX52248YNpHY1WUyCipamX51177P2Y3NmJ3imZw7fzG": {
    assetId: "FaX52248YNpHY1WUyCipamX51177P2Y3NmJ3imZw7fzG",
    name: "Teste Token",
    icon: "odyx-token.png",
    abbreviation: "OPN",
  },
  //_thelordofnodes
  // "": {name:"Not found" },
  //_lunes.in
  // "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": {
  // name:"ZEN Token"},
  //legion.cash
  // "": {name:"Not Found"},
  //_spartan node
  // "": {name:"Not Found"},
  //_lunesrealnode.com
  "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk": {
    assetId: "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
    name:"NEO Token",
    icon: "lunesrealnode-token.png",
    abbreviation: "NEO",
  },
  "Gf5ko4JJ2jRrtEnRdZXJ15cF3cuFVHRZti9sBXcspba8": {
    assetId: "Gf5ko4JJ2jRrtEnRdZXJ15cF3cuFVHRZti9sBXcspba8",
    name:"NEO Token",
    icon: "lunesrealnode-token.png",
    abbreviation: "NEO",
  },
  //_masternodebrasil
  // "":"Not Found",
  //_unknown
  "Bome8qGJtJucpHdE8mSMBDWMJ5TCiopRPVb6cJG3Ueym": {
    assetId: "Bome8qGJtJucpHdE8mSMBDWMJ5TCiopRPVb6cJG3Ueym",
    name: "Unknown",
    icon: "default-token.png",
    abbreviation: "Unknown",
  }
}
export const getAssetInfo = (assetId) => {
  return ASSETS[assetId];
}
