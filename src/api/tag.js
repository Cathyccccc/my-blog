import instance from "./instance";

const getTagList = () => {
  return instance.get("/tag");
};

const addTag = (tag_name) => {
  return instance.post("/tag", { tag_name });
};

const deleteTag = (id) => {
  return instance.delete(`/tag/${id}`);
};
export { getTagList, addTag, deleteTag };
