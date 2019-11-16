"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const tmpl_1 = require("./tmpl");
const demoRoot = 'src/views/demo';
function writeRouteFile(routes) {
    const routesStr = routes.map(route => {
        return `{
  path: '${route.group}/${route.name}',
  component: () => import('@/views/demo/${route.group}/${route.file}'),
  meta: {tag: '${route.groupName}', name: '${route.title}'}
}`;
    }).join(', ');
    tmpl_1.createFromTmpl('src/templates/routes.ts.tmpl', { routesStr }, 'src/router/demo.ts');
}
function createDemoRoutes() {
    const def = JSON.parse(fs_1.default.readFileSync(`${demoRoot}/index.json`).toString());
    const routes = [];
    Object.keys(def).forEach(groupdir => {
        if (fs_1.default.existsSync(`${demoRoot}/${groupdir}`)) {
            const groupName = def[groupdir].name;
            const demos = def[groupdir].demos;
            if (demos) {
                const files = fs_1.default.readdirSync(`${demoRoot}/${groupdir}`);
                files.forEach(file => {
                    const nameWithoutExtension = file.substr(0, file.lastIndexOf('.'));
                    if (demos[nameWithoutExtension]) {
                        routes.push({
                            group: groupdir,
                            groupName,
                            name: nameWithoutExtension,
                            title: demos[nameWithoutExtension],
                            file
                        });
                    }
                });
            }
        }
    });
    writeRouteFile(routes);
}
createDemoRoutes();
