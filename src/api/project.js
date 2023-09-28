import instance from '.';

const getProjectList = () => {
  return instance.get('/project');
}

export {
  getProjectList,
}