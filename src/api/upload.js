import instance from "./instance";

// 图片上传
function uploadImage(img) {
  return instance.post("/upload", img);
}

// axios#get(url[, config])
function getImage(path) {
  return instance.get(`/static${path}`, {
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

// axios#post(url[, data[, config]])
function uploadFile(file) {
  return instance.post("/upload/file", file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function mergeFile({ filename, size }) {
  return instance.post("/upload/merge", { data: { filename, size } });
}

export { getImage, mergeFile,uploadFile, uploadImage };
