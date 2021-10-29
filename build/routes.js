"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = require("./path");
const tmpl_1 = require("./tmpl");
const utils_1 = require("./utils");
const md5_1 = (0, tslib_1.__importDefault)(require("md5"));
const generatedDemoPath = path_1.generatedPath + '/demo';
(0, utils_1.mkdirs)(path_1.generatedPath);
(0, utils_1.mkdirs)(generatedDemoPath);
function writeRouteFile(routes) {
    const routesStr = routes.map(route => {
        return `{
  path: '${route.file}',
  component: () => import('../views/demo/generated/${route.file}/index.vue'),
  meta: {tag: '${route.groupName}',
  name: '${route.title}'}
}`;
    }).join(', ');
    (0, tmpl_1.createFromTmpl)('templates/routes.ts.tmpl', { routesStr }, 'src/router/demo.ts');
}
function createDemoRoutes() {
    const routes = [];
    const demoDirs = fs_1.default.readdirSync(path_1.demoRoot);
    demoDirs.forEach(dir => {
        if (fs_1.default.statSync(path_1.demoRoot + '/' + dir).isDirectory()) {
            const demoFiles = fs_1.default.readdirSync(`${path_1.demoRoot}/${dir}`);
            demoFiles.forEach(f => {
                if (f.toLowerCase().endsWith(".md")) {
                    const pf = f.substr(0, f.lastIndexOf('.'));
                    const parentId = (0, md5_1.default)(dir);
                    (0, utils_1.createDoc)(path_1.demoRoot + '/' + dir + '/' + f);
                    routes.push({
                        group: dir,
                        file: parentId + '-' + (0, md5_1.default)(pf),
                        groupName: dir,
                        title: pf,
                        markdown: false,
                        name: pf
                    });
                }
            });
        }
    });
    writeRouteFile(routes);
}
createDemoRoutes();
