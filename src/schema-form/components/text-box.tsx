import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {type: String, required: true},
    schema: {type: Object}
  },
  render() {
    const split = this.text.split('%s');
    
    return null;
  }
});
export const FormTextBox = createControllerBox<IFormTextBox>(
    'text-box',
    styled(({children, schema, className}) => {
      const {title, help, text, name, extra, ...props} = schema['x-props'];
      const ref: React.RefObject<HTMLDivElement> = useRef();
      const arrChildren = toArr(children);
      const split = text.split('%s');
      useEffect(() => {
        if (ref.current) {
          const eles = ref.current.querySelectorAll('.text-box-field');
          eles.forEach((el: HTMLElement) => {
            const ctrl = el.querySelector(
                '.ant-form-item-control>*:not(.ant-form-item-space)'
            );
            if (ctrl) {
              el.style.width = getComputedStyle(ctrl).width;
            }
          });
        }
      }, []);

      let index = 0;
      const newChildren = split.reduce((buf, item, key) => {
        return buf.concat(
            item ? (
                <span key={index++} className="text-box-words">
                  {item}
                </span>
            ) : null,
            arrChildren[key] ? (
                <div key={index++} className="text-box-field">
                  {arrChildren[key]}
                </div>
            ) : null
        );
      }, []);

      if (!title) {
        return (
            <div className={className} ref={ref}>
              {newChildren}
            </div>
        );
      }

      return React.createElement(
          FormLayoutItem,
          {
            label: title,
            noMinHeight: true,
            id: name,
            extra,
            help,
            ...props
          },
          <div className={className} ref={ref}>
            {newChildren}
          </div>
      );
    })`
    display: flex;
    .text-box-words {
      font-size: 14px;
      line-height: 34px;
      color: #333;
      ${props => {
      const {editable, schema} = props;
      const {gutter} = schema['x-props'];
      if (!editable) {
        return {
          margin: 0
        };
      }
      return {
        margin: `0 ${gutter === 0 || gutter ? gutter : 10}px`
      };
    }}
    }
    .text-box-words:nth-child(1) {
      margin-left: 0;
    }
    .text-box-field {
      display: inline-block;
    }
  `
);
