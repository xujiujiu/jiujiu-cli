#! node
const fs = require("fs");
const path = require("path");
const proData = {
    name: "jiujiucli-test",
    type: "dir",
    fileData:[
        {
            name: "build",
            type: "dir"
        },
        {
            name: "src",
            type: "dir",
            fileData:[
                {
                    name: 'assets',
                    type: 'dir'
                },
                {
                    name: 'router',
                    type: 'dir'
                },
                {
                    name: 'App.vue',
                    type:'file',
                    content: '<template>\n\t<div id="app">\n\t\t<router-view/>\n\t</div>\n</template>\n<script>\n\texport default {\n\t\tname : "App" \n\t}; \n</script>'
                },
                {
                    name: 'main.js',
                    type: 'file',
                    content: "import Vue from 'vue';\nimport router from './router';\nimport App from './App'; \n\n\tVue.config.productionTip = false;\n\n\tnew Vue({\n\t\tel : '#app',\n\t\trouter,\n\ti18n,\n\t\tstore,\n\t\tcomponents : { App },\n\t\ttemplate : '<App/>'\n\t});"
                }
            ]
        },
        {
            name: "static",
            type: "dir"
        },
        {
            name: "test",
            type: "dir"
        },
        {
            name: "index.html",
            type: "file",
            content: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<meta name="viewport" content="width=device-width,initial-scale=1.0">\n\t\t<title>vue-pro</title>\n\t</head>\n<html>\n\t<script type="text/javascript"></script>'
        }
    ]
}
if(proData.name){
    fs.mkdirSync(proData.name);
    let fileData = proData.fileData;
    let perentName = proData.name;
    forEachFile(fileData, perentName)
}
function forEachFile(fileData, perentName){
    if(fileData && fileData.forEach){
        fileData.forEach((f) => {
            f.path = perentName + '/' + f.name;
            f.content = f.content || '';
            let fName = f.path;
            switch (f.type){
                case 'dir':
                    fs.mkdirSync(f.path);
                    if(f.fileData){
                        forEachFile(f.fileData, fName);
                    }
                    break;
                case 'file':
                    fs.writeFileSync(f.path, f.content, 'utf-8');
                    break;
                default:
                    break;
            }
        })
    }
}