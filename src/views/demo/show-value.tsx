import beautify from 'js-beautify';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'ShowValue'
})
export default class ShowValue extends Vue {
  @Prop()
  public value: any;
  public valueModalVisible = false;

  public showData(this: any) {
    this.valueModalVisible = true;
  }

  public render() {
    return <div>
      <d-button onClick={this.showData}>查看数据</d-button>
      <ae-modal hideCancel
                onOk={() => {
                  this.valueModalVisible = false;
                }}
                vModel={this.valueModalVisible}>
        {this.valueModalVisible ? <pre>
          {this.getContent()}
        </pre> : null}
      </ae-modal>
    </div>;
  }

  private getContent() {
    return beautify(JSON.stringify(this.value));
  }
}
