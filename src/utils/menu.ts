import {RouteRecordRaw} from 'vue-router';

export interface MenuItem {
  id: string;
  name: string;
  path: string;
  children: Array<MenuItem>;
}

export const resolveMenus = (routes: RouteRecordRaw[]): MenuItem[] => {
  const menus: MenuItem[] = [];
  routes.forEach(route => {
    menus.push({
      id: route.path,
      name: route.meta.name as string,
      path: route.path,
      children: resolveMenus(route.children || [])
    });
  });
  return menus;
}
