import instance from "./instance";

// 分页获取文章列表（filterKey：根据搜索框输入内容或者tag.id进行数据过滤查询）
export const getArticleList = (
  { page, pageSize, filterKey } = { page: 1, pageSize: 5, filterKey: "" }
) => {
  return instance.get("/article", {
    params: {
      page,
      pageSize,
      filterKey,
    },
  });
};

// 获取浏览量最高的5个文章
// export const getFavorArticles = () => {
//   return instance.get("/article/favor");
// };

// 根据id获取文章
export const getArticleById = (id) => {
  return instance.get(`/article/${id}`);
};

// 新增文章
export const addArticle = (article) => {
  article.tag = JSON.stringify(article.tag);
  console.log("发送新增文章请求", article.tag);
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
