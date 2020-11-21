import fs from 'fs';
import {createFromTmpl} from './tmpl';

const demoRoot = 'site/views/demo';

interface DemoGroup {
  demos: { [key: string]: string };
  name: string;
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
  component: () => import('../views/demo/${route.group}/${route.file}'),
  meta: {tag: '${route.groupName}', name: '${route.title}'}
}`;
  }).join(', ');
  createFromTmpl('src/templates/routes.ts.tmpl', {routesStr}, 'site/router/demo.ts');
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
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
              file = file.substr(0, file.lastIndexOf('.'));
            }
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
