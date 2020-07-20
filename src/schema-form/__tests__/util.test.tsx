import {mount} from '@vue/test-utils';
import SchemaForm from '../index';


describe('Tree util', () => {
  it('calc range keys', () => {
    const wrapper = mount({
      render() {
        return (
          <SchemaForm schema={{
            fields: {
              name: {type: 'string', title: '名称'}
            }
          }}>
          </SchemaForm>
        );
      }
    });
    console.log(wrapper);
    const treeWrapper = wrapper.find({name: 'ATree'});
    // const keys = calcRangeKeys(
    //   treeWrapper.vm.$slots.default,
    //   ['0-0', '0-2', '0-2-0'],
    //   '0-2-0-1',
    //   '0-0-0'
    // );
    // const target = ['0-0-0', '0-0-1', '0-1', '0-2', '0-2-0', '0-2-0-0', '0-2-0-1'];
    // expect(keys.sort()).toEqual(target.sort());
  });
});
