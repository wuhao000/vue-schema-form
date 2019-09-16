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
            return 'el-checkbox-group';
        },
        optionComponent() {
            if (this.button) {
                return 'el-checkbox-button';
            }
            return 'el-checkbox';
        }
    }
};
//# sourceMappingURL=checkbox-group.jsx.map