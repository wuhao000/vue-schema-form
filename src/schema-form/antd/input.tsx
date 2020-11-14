import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseFormComponent from '../../mixins/base-input-component';
import hasProp, {hasListener} from '../../utils/props-util';

@Component({
  name: 'DInput',
  inheritAttrs: false
})
export default class DInput extends BaseFormComponent {

  public static install: (Vue) => void;


  public getInputComponent() {
    return 'a-input';
  }

  public getInitValue() {
    return '';
  }

  public onInput(value) {
    let val = value;
    if (value && ['[object InputEvent]', '[object Event]'].includes(value.toString())) {
      val = value.target.value;
    }
    if (typeof val !== 'object' && typeof val !== 'function') {
      this.$emit('input', val);
      if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
        this.stateValue = val;
      }
    }
  }

  public handleChange(value) {
    if (typeof value !== 'object' && typeof value !== 'function') {
      const comp: any = this.getInputComponent();
      if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
        this.stateValue = value;
      }
    }
  }

  public static Group: any;

  public static Search: any;

  public static TextArea: any;

  public static Password: any;
}


@Component({
  name: 'DInputGroup',
  inheritAttrs: false
})
class DInputGroup extends DInput {

  public getInputComponent() {
    return 'a-input-group';
  }

}

@Component({
  name: 'DInputPassword',
  inheritAttrs: false
})
class DInputPassword extends DInput {

  public getInputComponent() {
    return 'a-input-password';
  }

}


@Component({
  name: 'DInputSearch',
  inheritAttrs: false
})
class DInputSearch extends DInput {

  @Prop({})
  public enterButton: any;

  public getInputComponent() {
    return 'a-input-search';
  }

  public getSlots(): {} {
    let enterButton;
    if (this.$slots.enterButton) {
      if (this.$slots.enterButton.length) {
        enterButton = this.$slots.enterButton[0];
      } else {
        enterButton = <div>{this.$slots.enterButton}</div>;
      }
    }
    return {enterButton};
  }

  public getDefaultSlot(): VNode[] | VNode | undefined {
    if (this.$slots.default) {
      if (this.$slots.default.length) {
        return this.$slots.default[0];
      } else {
        return <div>{this.$slots.default}</div>;
      }
    }
  }

}

@Component({
  name: 'DTextarea',
  inheritAttrs: false
})
class DTextArea extends DInput {

  public getInputComponent() {
    return 'a-textarea';
  }

}

DInput.TextArea = DTextArea;

DInput.Search = DInputSearch;

DInput.Group = DInputGroup;

DInput.Password = DInputPassword;
