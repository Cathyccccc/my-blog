import instance from "./instance";

// 分页获取文章列表（filterKey：根据搜索框输入内容或者tag.id进行数据过滤查询）
export const getArticleList = ({
  page = 0,
  pageSize = 6,
  isPublish = 1,
  filterKey = null,
} = {}) => {
  let params = {
    page,
    pageSize,
    isPublish,
  };
  if (filterKey) {
    params.filterKey = filterKey;
  }
  return instance.get("/article", {
    params,
  });
};

// 根据id获取文章
export const getArticleById = (id) => {
  return instance.get(`/article/${id}`);
};

// 新增文章
export const addArticle = (article) => {
  article.tag = JSON.stringify(article.tag);
  return instance.post("/article", article);
};

// 删除文章
export const deleteArticle = (id) => {
  return instance.delete(`/article/${id}`);
};

// 更新文章
export const updateArticle = (article) => {
  article.tag = JSON.stringify(article.tag);
  article.comments = JSON.stringify(article.comments);
  return instance.put("/article", article);
};
