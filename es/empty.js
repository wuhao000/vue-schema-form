import { createVNode } from "vue";
export var createEmpty = function createEmpty(text) {
  return {
    render: function render() {
      var h = arguments[0];
      return createVNode("span", {
        "style": {
          fontSize: '11px',
          fontStyle: 'italic',
          color: 'gray'
        }
      }, [text]);
    }
  };
};
export default createEmpty('');