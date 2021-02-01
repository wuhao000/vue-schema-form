import {SCHEMA_FORM_STORE_INJECT_KEY} from '../config';
import {SchemaFormStore} from '../../../types';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import {LibComponents} from '../utils/utils';
import './form-block.less';

@Component({
  name: 'FormBlock'
})
export default class FormBlock extends Vue {

  @Prop({type: [String, Object], default: '添加'})
  public addText: string | VNode;
  @Prop({type: [String, Object], default: '删除'})
  public removeText: string | VNode;
  @Prop(Number)
  public maxItems: number;
  @Inject(SCHEMA_FORM_STORE_INJECT_KEY)
  public store: SchemaFormStore;

  public render() {
    const IconComponent = LibComponents.icon;
    return <div class="array-form-block">
      {
        this.$slots.default ? this.$slots.default.map((it, index) => {
          return <div class="array-item" key={'item-' + index}>
            <div class="array-index">
              <span>{index + 1}</span>
            </div>
            <div class="array-item-wrapper">{it}</div>
            {this.createOperators(index, IconComponent)}
            {index === this.$slots.default.length - 1 ? this.renderAddBtn() : null}
          </div>;
        }) : <d-empty description="" nativeOn={{
          click: () => {
            this.$emit('add');
          }
        }}>
          <div class="array-empty">
            <LibComponents.icon type="plus"/>
            <span>添加</span>
          </div>
        </d-empty>
      }
    </div>;
  }

  private createOperators(index: number, IconComponent: string) {
    if (!this.store.editable) {
      return;
    }
    return <div class="array-item-operator">
      <div class="circle-btn"
           onClick={() => {
             this.$emit('remove', index);
           }}>
        <LibComponents.icon type="delete"/>
        <span class="op-name">{this.removeText}</span>
      </div>
      {this.$slots.default.length > 1 ? [
        index !== this.$slots.default.length - 1 ? <div class="circle-btn"
                                                        onClick={() => {
                                                          this.$emit('moveDown', index);
                                                        }}>
          <IconComponent type={LibComponents.icons.down}/>
          <span class="op-name"/>
        </div> : null,
        index !== 0 ? <div class="circle-btn" onClick={() => {
          this.$emit('moveUp', index);
        }}>
          <IconComponent type={LibComponents.icons.up}/>
          <span class="op-name"/>
        </div> : null
      ] : null}
    </div>;
  }

  private renderAddBtn() {
    if (!this.store.editable) {
      return;
    }
    if (this.maxItems && this.maxItems <= this.$slots.default.length) {
      return;
    }
    return <div class="array-item-addition">
      <div class="ant-btn-text"
           onclick={() => {
             this.$emit('add');
           }}>
        <LibComponents.icon type="plus"/>
        {this.addText}
      </div>
    </div>;
  }
}
