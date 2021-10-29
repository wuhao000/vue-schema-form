import fs from 'fs';
import {generatedPath, demoRoot} from './path';
import {createFromTmpl} from './tmpl';
import {createDoc, getParentPath, md2Html, mkdirs} from './utils';
import md5 from 'md5';
const generatedDemoPath = generatedPath + '/demo';
mkdirs(generatedPath);
mkdirs(generatedDemoPath);

interface DemoGroup {
  name: string;
  demos: { [key: string]: string };
}

function writeRouteFile(routes: Array<RouteInfo>) {
  const routesStr = routes.map(route => {
    return `{
  path: '${route.file}',
  component: () => import('../views/demo/generated/${route.file}/index.vue'),
  meta: {tag: '${route.groupName}',
  name: '${route.title}'}
}`;
  }).join(', ');
  createFromTmpl('templates/routes.ts.tmpl', {routesStr}, 'src/router/demo.ts');
}

interface RouteInfo {
  group: string;
  groupName: string;
  title: string;
  name: string;
  file: string;
  markdown: boolean;
}

function createDemoRoutes() {
  const routes: Array<RouteInfo> = [];
  const demoDirs = fs.readdirSync(demoRoot);
  demoDirs.forEach(dir => {
    if (fs.statSync(demoRoot + '/' + dir).isDirectory()) {
      const demoFiles = fs.readdirSync(`${demoRoot}/${dir}`);
      demoFiles.forEach(f => {
        if (f.toLowerCase().endsWith(".md")) {
          const pf = f.substr(0, f.lastIndexOf('.'));
          const parentId = md5(dir);
          createDoc(demoRoot + '/' + dir + '/' + f)
          routes.push({
            group: dir,
            file: parentId + '-' +md5(pf),
            groupName: dir,
            title: pf,
            markdown: false,
            name: pf
          })
        }
      })
    }
  });

  writeRouteFile(routes);
}

createDemoRoutes();
