// 应该根据 router 进行菜单的创建（待办）
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
  {
    path: "/personal",
    pathname: "个人简介",
  },
];

const managePaths = [
  { path: "/manage/articles", pathname: "文章管理", icon: "i-tabler:align-box-left-middle" },
  // { path: "/manage/projects", pathname: "项目管理", icon: "i-tabler:align-box-left-middle" },
  // { path: "/manage/comments", pathname: "评论管理", icon: "i-tabler:align-box-left-middle" },
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
    key: "date",
    dataIndex: "date",
    title: "创建日期",
  },
  {
    key: "scanNumber",
    dataIndex: "scanNumber",
    title: "浏览数",
  },
  {
    key: "commentNumber",
    dataIndex: "commentNumber",
    title: "评论数",
  },
  {
    key: "isPublish",
    dataIndex: "isPublish",
    title: "是否发布",
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
  },
];

const colors = [
  "#ffe4e6",
  "#e0e7ff",
  "#d1fae5",
  "#ffedd5",
  "#fce7f3",
  "#dbeafe",
  "#dcfce7",
  "#fee2e2",
  "#fae8ff",
  "#e0f2fe",
  "#f5f5f4",
  "#ecfccb",
  "#f3e8ff",
  "#cffafe",
  "#f1f5f9",
  "#fef9c3",
  "#ede9fe",
  "#ccfbf1",
  "#fef3c7",
];

export { articleColumns, colors, managePaths, paths };
