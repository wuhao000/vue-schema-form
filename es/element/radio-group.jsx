import BaseOptionComponent from './base-option-component';
export default {
    mixins: [BaseOptionComponent],
    props: {
        button: Boolean
    },
    computed: {
        labelProp() {
            return 'text';
        },
        valueProp() {
            return 'label';
        },
        component() {
            return 'el-radio-group';
        },
        optionComponent() {
            if (this.button) {
                return 'el-radio-button';
            }
            return 'el-radio';
        }
    }
};
//# sourceMappingURL=radio-group.jsx.map