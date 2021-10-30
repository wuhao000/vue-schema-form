import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import {resolveMenus} from '../utils/menu';
import SubMenu from './sub-menu.vue';

export default (routes) => {
  return defineComponent({
    name: 'DocNav',
    setup() {
      const router = useRouter();
      const openKeys = ref([]);
      const menus = resolveMenus(routes);
      return {
        openKeys,
        menus,
        to(path: string) {
          return router.push(path);
        }
      };
    },
    render() {
      return (
          <a-menu
              openKeys={this.openKeys}
              mode="inline">
            {
              this.menus.map((item) => {
                if (item.children.length) {
                  return (
                      <a-sub-menu
                          key={item.path}
                          title={item.name}>
                        <SubMenu
                            menus={item.children}
                            title={item.path}>
                        </SubMenu>
                      </a-sub-menu>
                  );
                } else {
                  return (
                      <a-menu-item
                          key={item.path}
                          onClick={() => {
                            this.to(item.path);
                          }}>
                        {item.name}
                      </a-menu-item>
                  );
                }
              })
            }
          </a-menu>
      );
    }
  });
};
