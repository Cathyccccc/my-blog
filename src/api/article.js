import instance from ".";

// 分页获取文章列表
const getArticleList = ({page, pageSize, filterKey} = {page: 1, pageSize: 5, filterKey: ''}) => {
  return instance.get('/article', {
    params: {
      page,
      pageSize,
      filterKey,
    }
  })
}

// 根据id获取文章
const getArticleById = (id) => {
  return instance.get(`/article/${id}`)
}

// 新增文章
const addArticle = (article) => {
  article.tag = JSON.stringify(article.tag);
  return instance.post('/article', article)
}

// 删除文章
const deleteArticle = (id) => {
  return instance.delete(`/article/${id}`)
}

// 更新文章
const updateArticle = (article) => {
  article.tag = JSON.stringify(article.tag);
  article.comments = JSON.stringify(article.comments);
  console.log(article)
  return instance.put('/article', article)
}

export {
  getArticleList,
  getArticleById,
  addArticle,
  deleteArticle,
  updateArticle,
}