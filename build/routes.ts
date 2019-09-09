import fs from 'fs';
import {createFromTmpl} from './tmpl';

const demoRoot = 'src/views/demo';

interface DemoGroup {
  name: string;
  demos: { [key: string]: string };
}

interface DemoDefinition {
  [key: string]: DemoGroup;
}

function writeRouteFile(routes: Array<{
  group: string;
  groupName: string;
  title: string;
  name: string;
  file: string
}>) {
  const routesStr = routes.map(route => {
    return `{
  path: '${route.group}/${route.name}',
  component: () => import('@/views/demo/${route.group}/${route.file}'),
  meta: {tag: '${route.groupName}', name: '${route.title}'}
}`;
  }).join(', ');
  createFromTmpl('src/templates/routes.ts.tmpl', {routesStr}, 'src/router/demo.ts');
}

function createDemoRoutes() {
  const def: DemoDefinition = JSON.parse(fs.readFileSync(`${demoRoot}/index.json`).toString());
  const routes: Array<{
    group: string;
    groupName: string;
    title: string;
    name: string;
    file: string;
  }> = [];
  Object.keys(def).forEach(groupdir => {
    if (fs.existsSync(`${demoRoot}/${groupdir}`)) {
      const groupName = def[groupdir].name;
      const demos = def[groupdir].demos;
      if (demos) {
        const files = fs.readdirSync(`${demoRoot}/${groupdir}`);
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
        Object.keys(demos);
      }
    }
  });
  writeRouteFile(routes);
}

createDemoRoutes();
