import instance from '.';

const getProjectList = () => {
  return instance.get('/project');
}

const addProject = (project) => {
  project.technology = JSON.stringify(project.technology);
  return instance.post('/project', project);
}

const deleteProject = (id) => {
  return instance.delete(`/project/${id}`);
}

const updateProject = (project) => {
  project.technology = JSON.stringify(project.technology);
  return instance.put('/project', project);
}

export {
  getProjectList,
  addProject,
  deleteProject,
  updateProject,
}