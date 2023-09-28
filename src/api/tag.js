import instance from '.'

const getTagList = () => {
  return instance.get('/tag');
}

export {
  getTagList,
}