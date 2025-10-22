const fs = require('fs');
const path = require('path');

const pathObj = {
  originPath: path.resolve(__dirname, 'LunaTV-config.json'),
  jin18Path: path.resolve(__dirname, 'jin18.json'),
  jingjianPath: path.resolve(__dirname, 'jingjian.json'),
}


const readFileSync = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
}
const writeFileSync = (filePath, data) => {
  fs.writeFileSync(filePath, data, 'utf8');
}
(() => {
  try {
    const originJSON = readFileSync(pathObj.originPath);
    const originObj = JSON.parse(originJSON);
    const jin18Obj = {
        cache_time: 7200,
        api_site:{}
    };
    Object.entries(originObj.api_site).forEach(([key, value]) => {
      if(!value.name.includes('🔞')){
        jin18Obj.api_site[key] = value;
      }
    })
    writeFileSync(pathObj.jin18Path, JSON.stringify(jin18Obj,null, 2))
    writeFileSync(pathObj.jingjianPath, originJSON);
    console.log("自动生成-success")
  } catch (error) {
    console.log("自动生成-error", error)
  }
})()

