const paths = [
  {
    path: "/article",
    pathname: "文章列表",
    icon: "i-tabler:align-box-left-middle",
  },
  {
    path: "/project",
    pathname: "项目列表",
    icon: "i-tabler:browser-check",
  },
];

const managePaths = [
  { path: "/manage/articles", pathname: "文章管理", icon: "i-tabler:align-box-left-middle" },
  { path: "/manage/projects", pathname: "项目管理", icon: "i-tabler:align-box-left-middle" },
  { path: "/manage/comments", pathname: "评论管理", icon: "i-tabler:align-box-left-middle" },
  { path: "/manage/tags", pathname: "标签管理", icon: "i-tabler:align-box-left-middle" },
];

const articleColumns = [
  {
    dataIndex: "index",
    title: "序号",
  },
  {
    dataIndex: "title",
    title: "文章标题",
  },
  {
    key: "coverImg",
    dataIndex: "coverImg",
    title: "文章封面",
  },
  {
    key: "tag",
    dataIndex: "tag",
    title: "文章分类",
  },
  {
    dataIndex: "date",
    title: "创建日期",
  },
  {
    dataIndex: "scanNumber",
    title: "浏览数",
  },
  {
    dataIndex: "commentNumber",
    title: "评论数",
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
  },
];

export { paths, managePaths, articleColumns };
