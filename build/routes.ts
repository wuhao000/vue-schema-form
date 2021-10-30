import {children} from 'cheerio/lib/api/traversing';
import fs from 'fs';
import {docsRoot, generatedPath} from './path';
import {createFromTmpl} from './tmpl';
import {createDoc, getRelativeDocPaths, mkdirs} from './utils';

const generatedDemoPath = generatedPath + '/demo';
mkdirs(generatedPath);
mkdirs(generatedDemoPath);

function toRouteStr(route: RouteInfo) {
  return `{
  path: '${route.path}',
  ${route.children.length ? `redirect: '${route.children[0].path}',
  component: RootComponent,` : `component: () => import('../generated/${route.file}'),`}
  meta: {
    tags: [${route.groups.map(it => `'${it}'`).join(',')}],
    name: '${route.name}'
  },
  ${children.length ? `children: [
    ${route.children.map(child => toRouteStr(child)).join(',\n')}
  ]` : ''}
}`;
}

function writeRouteFile(routes: Array<RouteInfo>, name) {
  const routesStr = routes.map(route => {
    return toRouteStr(route);
  }).join(', ');
  createFromTmpl('templates/routes.ts.tmpl', {routesStr}, `src/router/${name}.ts`);
}

interface RouteInfo {
  children: RouteInfo[];
  file?: string;
  group: string;
  groups: string[];
  name: string;
  path: string;
}


function crateRoute(path: string): RouteInfo {
  const {groupPaths, generatedPath} = getRelativeDocPaths(path);
  return {
    group: groupPaths[0],
    file: generatedPath.join('/') + '/index.vue',
    path: '/' + generatedPath.join('/'),
    groups: groupPaths.length > 1 ? groupPaths.slice(0, groupPaths.length - 1).slice(1) : [],
    name: groupPaths[groupPaths.length - 1],
    children: []
  };
}

function crateRouteParent(path: string): RouteInfo {
  const {groupPaths, generatedPath} = getRelativeDocPaths(path);
  return {
    group: groupPaths[0],
    path: '/' + generatedPath.join('/'),
    groups: groupPaths.length > 1 ? groupPaths.slice(0, groupPaths.length - 1).slice(1) : [],
    name: groupPaths[groupPaths.length - 1],
    children: []
  };
}

function resolveRoute(path: string, routes: RouteInfo[]) {
  routes.push(crateRoute(path));
}

function scan(dir: string) {
  const demoDirs = fs.readdirSync(dir);
  const routes = [];
  demoDirs.map(it => `${dir}/${it}`).forEach(path => {
    if (fs.statSync(path).isDirectory()) {
      const route = crateRouteParent(path);
      route.children = scan(path);
      routes.push(route);
    } else {
      if (path.toLowerCase().endsWith('.md')) {
        createDoc(path);
        resolveRoute(path, routes);
      }
    }
  });
  return routes;
}

function createDemoRoutes() {
  fs.readdirSync(`${process.env.PWD}/${docsRoot}`).forEach(name => {
    const routes: Array<RouteInfo> = scan(`${process.env.PWD}/${docsRoot}/${name}`);
    writeRouteFile(routes, name);
  });
}

createDemoRoutes();
