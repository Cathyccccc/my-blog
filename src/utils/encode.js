/**
 * 获取 Base64 格式的图片（将图片文件转为 Base64字符串）
 * @param {File} file 文件对象 
 * @returns Base64
 */
export function getBase64(file) {
  let base64;
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(e.target.result);
    base64 = e.target.result;
  }
  reader.readAsDataURL(file);
  return base64;
}