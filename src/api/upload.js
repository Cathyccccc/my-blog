import instance from "./instance";

// 图片上传
function uploadImage(img) {
  return instance.post("/upload", img);
}

function getImage(path) {
  return instance.get(`/static/${path}`, {
    headers: {
      Accept: "image/jpeg",
    },
    responseType: "blob",
    transformResponse: (res) => {
      return {
        code: 0,
        success: true,
        data: res,
      };
    },
  });
}

export { uploadImage, getImage };
