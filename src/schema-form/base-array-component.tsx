import {SCHEMA_FORM_STORE_INJECT_KEY} from './config';
import {SchemaFormStore} from '../../types';

import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop, Watch} from 'vue-property-decorator';
import {ASchemaForm, getButtonComponent, getColComponent, getRowComponent, isNull, MOBILE} from './utils/utils';

@Component({
  name: 'BaseArrayComponent'
})
export default class BaseArrayComponent extends Vue {
  @Prop(Array)
  public value: any[];
  @Prop({type: Number, default: 12})
  public cellSpan: number;
  @Prop(String)
  public addBtnText: string;
  @Prop(Object)
  public addBtnProps: any;
  @Prop({type: Number, default: 0})
  public maxLength: number;
  @Prop(String)
  public component: string;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  public current = isNull(this.value) ? [] : this.value;
  @Inject(SCHEMA_FORM_STORE_INJECT_KEY)
  public store: SchemaFormStore;

  @Watch('value')
  public valueChanged(value) {
    this.current = value || [];
  }

  @Watch('current')
  public currentChanged(current: any[]) {
    this.$emit('input', current);
    this.$emit('change', current);
  }

  public validate() {
    return true;
  }

  public renderAddButton() {
    if (!this.store.editable) {
      return null;
    }
    const ColComponent = getColComponent();
    let ButtonComponent = getButtonComponent();
    if (this.maxLength > 0 && this.current.length >= this.maxLength) {
      return null;
    }
    if (this.store.platform === MOBILE) {
      ButtonComponent = 'm-button';
    }
    const buttonStyle: any = {};
    if (this.addBtnProps?.block) {
      buttonStyle.width = '100%';
    }
    const button = <ButtonComponent onClick={this.onAddClick}
                                    disabled={this.disabled}
                                    style={buttonStyle}
                                    icon="plus"
                                    attrs={Object.assign({}, this.addBtnProps)}>{this.addBtnText || '添加'}</ButtonComponent>;
    if (this.component === ASchemaForm) {
      return <div style={{margin: '10px 15px'}}>{button}</div>;
    }
    return <ColComponent span={this.cellSpan}>{button}</ColComponent>;
  }

  public onAddClick() {
    this.current.push(null);
  }

  public render() {
    const InputComponent = this.component;
    const RowComponent = getRowComponent();
    const ColComponent = getColComponent();
    const content = [
      this.current.map((v, index) => {
        const input = <InputComponent
          attrs={Object.assign({arrayIndex: index}, this.$attrs)}
          onRemove={async (index) => {
            // @ts-ignore
            await this.$mconfirm('确定删除此项吗?', '提示');
            this.current.splice(index, 1);
          }}
          vModel={this.current[index]}/>;
        if (this.component === ASchemaForm) {
          return input;
        }
        return <ColComponent span={this.cellSpan}>{input}</ColComponent>;
      }),
      this.renderAddButton()
    ];
    if (this.component === ASchemaForm) {
      return <div>{content}</div>;
    }
    if (this.store.platform === MOBILE) {
      return content;
    } else {
      return <RowComponent gutter={this.$attrs.gutter || 20}
                           type="flex">{content}</RowComponent>;
    }
  }
}
