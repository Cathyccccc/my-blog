const modules = import.meta.glob(["./*.js", "!./index.js"], { eager: true });
let apiModule = {};
for (let path in modules) {
  const moduleName = path.replace("./", "").replace(".js", "");
  apiModule[moduleName] = modules[path];
}

export default apiModule;
