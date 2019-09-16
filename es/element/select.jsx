import BaseOptionComponent from './base-option-component';
export default {
    mixins: [BaseOptionComponent],
    computed: {
        component() {
            return 'el-select';
        },
        optionComponent() {
            return 'el-option';
        }
    }
};
//# sourceMappingURL=select.jsx.map