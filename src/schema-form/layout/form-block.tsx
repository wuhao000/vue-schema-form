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
    return <div class="array-form-block">
      {
        this.$slots.default ? this.$slots.default.map((it, index) => {
          return <div class="array-item">
            <div class="array-index">
              <span>{index + 1}</span>
            </div>
            <div class="array-item-wrapper">{it}</div>
            <div class="array-item-operator">
              <div class="circle-btn"
                   onClick={() => {
                     this.$emit('remove', index);
                   }}>
                <ae-icon type="delete"/>
                <span class="op-name">{this.removeText}</span>
              </div>
              {this.$slots.default.length > 1 ? [
                index !== this.$slots.default.length - 1 ? <div class="circle-btn"
                                                                onClick={() => {
                                                                  this.$emit('moveDown', index);
                                                                }}>
                  <ae-icon type="down"/>
                  <span class="op-name"/>
                </div> : null,
                index !== 0 ? <div class="circle-btn" onClick={() => {
                  this.$emit('moveUp', index);
                }}>
                  <ae-icon type="up"/>
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
            <ae-icon type="plus"/>
            <span>添加</span>
          </div>
        </d-empty>
      }
    </div>;
  }

  private renderAddBtn() {
    if (this.maxItems && this.maxItems > this.$slots.default.length) {
      return;
    }
    return <div class="array-item-addition">
      <div class="ant-btn-text"
           onclick={() => {
             this.$emit('add');
           }}>
        <ae-icon type="plus"/>
        {this.addText}
      </div>
    </div>;
  }
}
