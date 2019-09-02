import Vue from 'vue';
import Component from 'vue-class-component';
import './form-block.less';

@Component({
  name: 'FormBlock'
})
export default class FormBlock extends Vue {

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
                <span class="op-name">这是定制的删除文案</span>
              </div>
              {this.$slots.default.length > 1 ? [
                <div class="circle-btn">
                  <ae-icon type="down"/>
                  <span class="op-name"/>
                </div>,
                <div class="circle-btn">
                  <ae-icon type="up"/>
                  <span class="op-name"/>
                </div>
              ] : null}
            </div>
            <div class="array-item-addition">
              <div class="ant-btn-text"
                   onClick={() => {
                     this.$emit('add');
                   }}>
                <ae-icon type="plus"/>
                添加
              </div>
            </div>
          </div>;
        }) : null
      }
    </div>;
  }
}
