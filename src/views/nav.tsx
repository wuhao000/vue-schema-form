import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { resolveMenus } from '../utils/menu';

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
      const toMenuItem = (item) => {
        const menu: {
          key: string;
          label: string;
          title: string;
          children?: any[];
          onClick?: () => void;
        } = {
          key: item.path,
          label: item.name,
          title: item.name,
        };
        if (item.children?.length) {
          menu.children = item.children.map(toMenuItem);
        } else {
          menu.onClick = () => {
            if (!item.children?.length) {
              this.to(item.path);
            }
          }
        }
        return menu;
      };

      return (
        <a-menu
          openKeys={this.openKeys}
          mode="inline"
          items={this.menus.map(toMenuItem)}
        />
      );
    }
  });
};
