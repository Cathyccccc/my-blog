/**
 * 获取 Base64 格式的图片（将图片文件转为 Base64字符串）
 * @param {File} file 文件对象 
 * @returns Base64
 */
export function getBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    callback(e.target.result);
  }
  reader.readAsDataURL(file);
}

/**
 * 将base64数据转为file文件（先转为，再转为file）
 * @param {String} base64Data 
 * @returns {File} File对象
 */
export function convertBase64ToFile(base64Data) {
  let bstr = atob(base64Data), // 对base64字符串进行解码
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * 将base64数据转为Blob对象
 * @param {String} base64Data 
 * @returns {Blob} Blob对象
 */
export function convertBase64ToBlob(base64Data) {
  var arr = base64Data.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}