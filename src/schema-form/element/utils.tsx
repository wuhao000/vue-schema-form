import {useBaseInput} from "../mixins";

export const createCard = () => {
  return (props, ctx) => {
    return <el-card {...props}
                    header={props.title}
                    shadow={'never'}
                    v-slots={ctx.slots}/>;
  };
};
export const createCheckbox = () => {
  return (props, ctx) => {
    return <el-checkbox {...props}
                        v-slots={ctx.slots}/>;
  };
};
export const createRate = () => {
  return (props, ctx) => {
    return <el-rate {...props}
                    v-slots={ctx.slots}/>;
  };
};
export const createInput = () => {
  return (props, ctx) => {
    return <el-input {...props}
                     v-slots={ctx.slots}/>;
  };
};
export const createPassword = () => {
  return (props, ctx) => {
    return <el-input {...props}
                     type="password"
                     v-slots={ctx.slots}/>;
  };
};
export const createInputNumber = () => {
  return (props, ctx) => {
    return <el-input-number {...props}
                            v-slots={ctx.slots}/>;
  };
};

export const createForm = () => {
  return (props, ctx) => {
    return <el-form {...props}
                    v-slots={ctx.slots}/>;
  };
};

export const createFormItem = () => {
  return (props, ctx) => {
    return <el-form-item {...props}
                         v-slots={ctx.slots}/>;
  };
};

export const createCol = () => {
  return (props, ctx) => {
    return <el-col {...props}
                   v-slots={ctx.slots}/>;
  };
};


export const createRow = () => {
  return (props, ctx) => {
    return <el-row {...props}
                   v-slots={ctx.slots}/>;
  };
};

export const createContainer = () => {
  return (props, ctx) => {
    return <el-container {...props}
                         v-slots={ctx.slots}/>;
  };
};

export const createHeader = () => {
  return (props, ctx) => {
    return <el-header {...props}
                      v-slots={ctx.slots}/>;
  };
};

export const createFooter = () => {
  return (props, ctx) => {
    return <el-footer {...props}
                      v-slots={ctx.slots}/>;
  };
};

export const createAside = () => {
  return (props, ctx) => {
    return <el-aside {...props}
                     v-slots={ctx.slots}/>;
  };
};

export const createMain = () => {
  return (props, ctx) => {
    return <el-main {...props}
                    v-slots={ctx.slots}/>;
  };
};
export const createPopover = () => {
  return (props, ctx) => {
    return <el-popover {...props}
                       v-slots={ctx.slots}/>;
  };
};

export const createSlider = () => {
  return (props, ctx) => {
    return <el-slider {...props}
                      v-slots={ctx.slots}/>;
  };
};


export const createSwitch = () => {
  return (props, ctx) => {
    return <el-switch {...props}
                      v-slots={ctx.slots}/>;
  };
};
export const createCascader = () => {
  return (props, ctx) => {
    const {size} = useBaseInput(props, ctx);
    return <el-cascader {...{size: size.value, ...props, ...ctx.attrs}}
                        v-slots={ctx.slots}/>;
  };
};
export const createResult = () => {
  return (props, ctx) => {
    return <el-result {...props}
                      v-slots={ctx.slots}/>;
  };
};

export const createDatePicker = () => {
  return (props, ctx) => {
    return <el-date-picker {...props}
                           v-slots={ctx.slots}/>;
  };
};


export const createEmpty = () => {
  return (props, ctx) => {
    return <el-empty {...props}
                     v-slots={ctx.slots}/>;
  };
}

export const createAlert = () => {
  return (props, ctx) => {
    return <el-alert {...props}
                     v-slots={ctx.slots}/>;
  };
}