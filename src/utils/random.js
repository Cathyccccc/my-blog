import Identicon from "identicon.js"

/**
 * 生成一个随机名称
 * @param {*} length 
 * @returns {String}
 */
export function getRandomName(length){
  function randomAccess(min,max){
    return Math.floor(Math.random() * (min - max) + max)
  }
  let name = ""
  for(let i = 0;i<length;i++){
    name += String.fromCharCode(randomAccess(0x4E00,0x9FA5))
  }
  return name
}

/**
 * 生成一个随机hash头像 
 */
export function getRandomHashAvatar(hashStr) {
  const data = new Identicon(hashStr, 420).toString();
  const base64 = `data:image/png;base64,${data}`;
  return base64;
}

