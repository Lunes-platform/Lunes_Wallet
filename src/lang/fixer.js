// node fixer.js
// missing_in_en_US.json | mostra as propriedades que não tem no en_US.json
// missing_in_pt_BR | mostra as propriedades que não tem no pt_BR.json

/*eslint-disable*/
let fs = require('fs')
let ptBR = fs.readFileSync("./pt_BR.json")
let enUS = fs.readFileSync("./en_US.json")

Object.prototype.iterate = function(callback) {
  Object.keys(this).map((key) => {
    callback(this[key], key)
  })
}

let ptNotEn = {}; let enNotPt = {};
function init() {
  try {
    ptBR = JSON.parse(ptBR)
    enUS = JSON.parse(enUS)
  } catch (err) {
    console.log("Failed to parse files, verify if the content is alright")
  }
  ptBRKeys = Object.keys(ptBR)
  enUSKeys = Object.keys(enUS)
  enUS.iterate((enUSVal, enUSKey) => {
    if (ptBRKeys.indexOf(enUSKey) === -1) {
      enNotPt[enUSKey] = enUSVal
    }
  })
  ptBR.iterate((ptBRVal, ptBRKey) => {
    if (enUSKeys.indexOf(ptBRKey) === -1) {
      ptNotEn[ptBRKey] = ptBRVal
    }
  })
}
init()

fs.writeFileSync(__dirname+'/missing_in_pt_BR.json', JSON.stringify(enNotPt, null, 2))
fs.writeFileSync(__dirname+'/missing_in_en_US.json', JSON.stringify(ptNotEn, null, 2))
