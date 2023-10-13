import instance from ".";

const getArticleList = ({page, pageSize} = {page: 1, pageSize: 10}) => {
  return instance.get('/article', {
    params: {
      page,
      pageSize,
    }
  })
}

const getArticleById = (id) => {
  return instance.get(`/article/${id}`)
}

export {
  getArticleList,
  getArticleById,
}