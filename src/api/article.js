import instance from ".";

const getArticleList = (params) => {
  return instance.get('/article', params)
}

const getArticleById = (id) => {
  return instance.get(`/article/${id}`)
}

export {
  getArticleList,
  getArticleById,
}