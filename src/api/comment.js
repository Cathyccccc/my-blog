import instance from "./instance";

function getComments() {
  return instance.get("/comment");
}

function addComment(articleId, commentId, comment, replyArr) {
  replyArr = JSON.stringify(replyArr);
  return instance.post("/comment", {
    articleId,
    commentId,
    comment,
    replyArr,
  });
}

function deleteComment(articleId, commentId) {
  return instance.delete(`/comment/${articleId}/${commentId}`);
}

export { getComments, addComment, deleteComment };
