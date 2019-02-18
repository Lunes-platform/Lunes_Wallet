const getImage = (type, name = '', extension = '') => {
  let filename;
  if (!name && extension) filename = 'default.png'
  else if (name && !extension)
    name.search('.') > 0 ? name : filename = 'default.png'
  else filename = name+'.'+extension

  switch (type) {
    case "coin":
      return _coins(filename)
    default:
      return 'bla.png'
  }
}
const _coins = (filename) => {
  let path = filename.search(/(brl)|(usd(?!t))|(eur)/igm) > -1 ? 'fiat' : 'coins'
  return `images/icons/${path}/${filename}`
}
export default getImage
