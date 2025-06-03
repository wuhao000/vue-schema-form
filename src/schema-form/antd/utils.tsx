import { useBaseInput } from '../mixins';
import { pick } from '../utils/utils';
import omit from 'omit.js';

export const createComponentProxy = (InputComponent: any) => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <InputComponent {...{size: size.value, ...props, ...ctx.attrs}}
                           v-slots={ctx.slots} />;
  };
};
export const createCascader = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-cascader {...{size: size.value, ...props, ...ctx.attrs}}
                       v-slots={ctx.slots} />;
  };
};
export const createInputNumber = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    if (props.extra) {
      return <span class="ant-input-number-fix-wrapper">
        <a-input-number {...{size: size.value, ...props, ...ctx.attrs}}
                        v-slots={ctx.slots} />
        <span>{props.extra}</span>
      </span>;
    }
    return <a-input-number {...{size: size.value, ...props, ...ctx.attrs}}
                           v-slots={ctx.slots} />;
  };
};
export const createRate = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-rate {...{size: size.value, ...props, ...ctx.attrs}}
                   v-slots={ctx.slots} />;
  };
};
export const createSlider = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-slider {...{size: size.value, ...props, ...ctx.attrs}}
                     v-slots={ctx.slots} />;
  };
};
export const createCheckbox = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-checkbox {...{size: size.value, ...props, ...ctx.attrs}}
                       v-slots={ctx.slots} />;
  };
};
export const createLayout = () => {
  return (props, ctx) => {
    return <a-layout {...props}
                     v-slots={ctx.slots} />;
  };
};

export const createCollapse = () => {
  const collapsePropKeys = ['accordion',
    'activeKey',
    'number',
    'bordered',
    'collapsible',
    'destroyInactivePanel',
    'expandIcon',
    'expandIconPosition',
    'onUpdate:activeKey',
    'ghost'
  ];
  return (props, ctx) => {
    return <a-collapse {...pick(props, collapsePropKeys)}>
      <a-collapse-panel
        {...omit(props, collapsePropKeys)}
        key={'panel'}
        v-slots={ctx.slots}
      />
    </a-collapse>;
  };
};
export const createCard = () => {
  return (props, ctx) => {
    return <a-card {...props}
                   v-slots={ctx.slots} />;
  };
};
export const createInput = () => {
  return (props, ctx) => {
    return <a-input {...props}
                    v-slots={ctx.slots} />;
  };
};
export const createEmpty = () => {
  return (props, ctx) => {
    return <a-empty {...props}
                    v-slots={ctx.slots} />;
  };
};
export const createLayoutFooter = () => {
  return (props, ctx) => {
    return <a-layout-footer {...props}
                            v-slots={ctx.slots} />;
  };
};
export const createPopup = () => {
  return (props, ctx) => {
    return <a-popup {...props}
                    v-slots={ctx.slots} />;
  };
};

export const createAlert = () => {
  return (props, ctx) => {
    return <a-alert
        {...props}
        v-slots={ctx.slots}
    />
  }
}

export const createResult = () => {
  return (props, ctx) => {
    return <a-result {...props}
                     v-slots={ctx.slots} />;
  };
};
export const createPopover = () => {
  return (props, ctx) => {
    return <a-popover {...props}
                      v-slots={ctx.slots} />;
  };
};
export const createLayoutSider = () => {
  return (props, ctx) => {
    return <a-layout-sider {...props}
                           v-slots={ctx.slots} />;
  };
};
export const createLayoutHeader = () => {
  return (props, ctx) => {
    return <a-layout-header {...props}
                            v-slots={ctx.slots} />;
  };
};
export const createLayoutContent = () => {
  return (props, ctx) => {
    return <a-layout-content {...props}
                             v-slots={ctx.slots} />;
  };
};
export const createRow = () => {
  return (props, ctx) => {
    return <a-row {...props}
                  v-slots={ctx.slots} />;
  };
};
export const createCol = () => {
  return (props, ctx) => {
    return <a-col {...props}
                  v-slots={ctx.slots} />;
  };
};
export const createSwitch = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-switch {...{size: size.value, ...props, ...ctx.attrs}}
                     v-slots={ctx.slots} />;
  };
};
export const createPassword = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-input-password {...{size: size.value, ...props, ...ctx.attrs}}
                             v-slots={ctx.slots} />;
  };
};

export const createTextarea = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <a-textarea {...{size: size.value, ...props, ...ctx.attrs}}
                       v-slots={ctx.slots} />;
  };
};

export const getPropByPath = function getPropByPath(obj, path, strict?) {
  let tempObj = obj;
  let copyPath = path;
  copyPath = copyPath.replace(/\[(\w+)]/g, '.$1');
  copyPath = copyPath.replace(/^\./, '');

  const keyArr = copyPath.split('.');
  let i = 0;
  for (const len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) {
      break;
    }
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

export const noop = function noop() {
  // do nothing
};
