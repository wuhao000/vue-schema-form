import {LibComponents} from '@/schema-form/utils/utils';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import './form-block.less';

@Component({
  name: 'FormBlock'
})
export default class FormBlock extends Vue {

  @Prop([String, Object])
  public addText: string | VNode;
  @Prop([String, Object])
  public removeText: string | VNode;
  @Prop(Number)
  public maxItems: number;

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
            <div class="array-item-operator">
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
            </div>
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

  private renderAddBtn() {
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
