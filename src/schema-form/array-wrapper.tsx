import {SCHEMA_FORM_STORE_INJECT_KEY} from './form';
import {SchemaFormStore} from '../../types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import {getButtonComponent, getColComponent, getRowComponent, LibComponents, MOBILE} from './utils/utils';

@Component({
  name: 'ArrayWrapper'
})
export default class ArrayWrapper extends Vue {
  @Prop({type: Number, default: 24})
  public cellSpan: number;
  @Prop(String)
  public addBtnText: string;
  @Prop(Object)
  public addBtnProps: any;
  @Prop({type: Number, default: 20})
  public gutter: number;
  @Prop({type: Boolean, default: true})
  public showRemoveBtn: boolean;
  @Prop({type: Boolean, default: true})
  public showAddBtn: boolean;
  @Prop({type: Number, default: 0})
  public maxLength: number;
  @Prop({type: Boolean, default: false})
  public subForm: boolean;
  @Inject(SCHEMA_FORM_STORE_INJECT_KEY)
  public store: SchemaFormStore;


  public renderAddButton() {
    if (!this.store.editable || !this.showAddBtn || (this.maxLength > 0 && this.$slots.default && this.$slots.default.length >= this.maxLength)) {
      return;
    }
    const ColComponent = getColComponent();
    let ButtonComponent = getButtonComponent();
    if (this.store.platform === 'mobile') {
      ButtonComponent = 'm-button';
    }
    const buttonStyle: any = {};
    if (this.addBtnProps?.block) {
      buttonStyle.width = '100%';
    }
    const props: any = Object.assign({}, this.addBtnProps);
    props.disabled = this.store && (this.store.disabled || this.store.loading) || props.disabled;
    if (!props.icon) {
      props.icon = 'plus';
    }
    const button = <ButtonComponent onClick={this.onAddClick}
                                    style={buttonStyle}
                                    attrs={props}>{this.addBtnText || '添加'}</ButtonComponent>;
    if (this.subForm) {
      return <div style={{margin: '10px 15px'}}>{button}</div>;
    }
    return <ColComponent span={this.cellSpan}>{button}</ColComponent>;
  }

  public onAddClick() {
    this.$emit('add');
  }

  public render() {
    const RowComponent = getRowComponent();
    const content = [
      this.renderFields(),
      this.renderAddButton()
    ];
    if (this.subForm) {
      return <div>{content}</div>;
    }

    if (this.$attrs.platform === 'mobile') {
      return content;
    } else {
      return <RowComponent gutter={this.gutter}
                           type="flex">
        {content}
      </RowComponent>;
    }
  }

  private renderFields() {
    if (this.store.platform === MOBILE) {
      return this.$slots.default && this.$slots.default.map((it, index) => {
        return <div style={{position: 'relative'}}>{
          [this.renderDeleteBtn(index), it]
        }</div>;
      });
    }
    return this.$slots.default && this.$slots.default.map((it, index) => {
      return <LibComponents.col span={this.cellSpan}>
        <LibComponents.layout>
          <LibComponents.content>
            {it}
          </LibComponents.content>
          <LibComponents.sider>
            {this.renderDesktopDeleteBtn(index)}
          </LibComponents.sider>
        </LibComponents.layout>
      </LibComponents.col>;
    });
  }

  private renderDeleteBtn(index: any) {
    if (!this.store.editable || !this.showRemoveBtn) {
      return null;
    }
    return <a
      style={{
        color: '#e94721',
        position: 'absolute',
        right: 0,
        top: '15px',
        cursor: 'pointer'
      }}
      onclick={() => {
        this.$emit('remove', index);
      }}>
      <LibComponents.icon type="delete"/>
      删除
    </a>;
  }

  private renderDesktopDeleteBtn(index: any) {
    if (!this.store.editable || !this.showRemoveBtn) {
      return null;
    }
    return <div style={{textAlign: 'right'}}
                class="d-image-picker">
      <a
        style={{
          color: '#e94721',
          cursor: 'pointer'
        }}
        onclick={() => {
          this.$emit('remove', index);
        }}>
        <LibComponents.icon type="delete"/>
        删除
      </a>
    </div>;
  }
}
