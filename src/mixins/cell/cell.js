import VueAdsChildrenButton from '../../components/ChildrenButton';
import CSSProcessor from '../../services/CSSProcessor';


export default {
    components: {
        VueAdsChildrenButton,
    },

    props: {
        row: {
            type: Object,
            required: true,
        },

        rowIndex: {
            type: Number,
            required: true,
        },

        column: {
            type: Object,
            required: true,
        },

        columnIndex: {
            type: Number,
            required: true,
        },

        cssProcessor: {
            type: CSSProcessor,
            required: true,
        },

        columnSlot: {
            type: Function,
            default: null,
        },

        toggleChildrenIconSlot: {
            type: Function,
            default: null,
        },
    },

    computed: {
        cellClasses () {
            return Object.assign(
                this.cssProcessor.process(null, this.columnIndex, this.column),
                this.cssProcessor.process(this.rowIndex + 1, this.columnIndex, this.row, this.column),
                this.cssProcessor.processFixed(this.row._classes, this.columnIndex, this.row, this.column),
            );
        },

        titleClasses () {
            return {
                'vue-ads-cursor-pointer': this.hasCollapseIcon,
                'vue-ads-flex': true,        
                'vue-ads-flex-row': true,        
                'items-center': true,
                'text-black' : true,        
            };
        },

        iconClasses () {
            return {
                'vue-ads-value-icon': this.hasIcon,
                'vue-ads-value-no-icon': !this.hasIcon,
            };
        },

        style () {
            return {
                'padding-left': (1 + (this.parent * 1.5)) + 'rem',
            };
        },

        iconStyle() {
          //if (this.columnIndex == 0 && this.row._iconUrl != '') {
          if (this.columnIndex == 0) {
                return {
                'background'   : 'url(' + this.row._iconUrl + ')  0px 0px / 100% no-repeat',  //100% - fit image
                'width'        : 16 + 'px',
                'height'       : 16 + 'px',
                'margin-right': 5 + 'px',
            }
          } else { 
            return {
          }
        }
        },

        parent () {
            let parent = 0;

            if (this.columnIndex === 0) {
                parent += this.row._meta.groupParent;
            }

            if (this.column.collapseIcon) {
                parent += this.row._meta.parent;
            }

            return parent;
        },

        collapsable () {
            return this.column.collapseIcon || this.groupCollapsable;
        },

        groupCollapsable () {
            return this.column.groupCollapsable && this.row._meta.groupColumn;
        },

        hasCollapseIcon () {
            return this.collapsable &&
                (this.row._meta.visibleChildren.length > 0 || this.row._hasChildren);
        },

        hasIcon() {
            return this.row._hasIcon;
        },

        iconUrl() {
            return this.row._iconUrl;
        },
        
        clickEvents () {
            return this.hasCollapseIcon ? {
                click: this.toggleChildren,
            } : {};
        },
    },

    methods: {
        value (createElement) {
            let elements = [];

            if (this.hasCollapseIcon) {
                elements.push(createElement(VueAdsChildrenButton, {
                    props: {
                        expanded: this.row._showChildren || false,
                        loading: this.row._meta.loading || false,
                        iconSlot: this.toggleChildrenIconSlot,
                    },
                    nativeOn: this.clickEvents,
                }));
            }

            //RVE - add Icon between expand/collapse group Icon and text 
            if (this.hasIcon) {
                elements.push(createElement('img', {
                    class: this.iconClasses,
                    //on: this.clickEvents,
                    style: this.iconStyle,
                }, ""));
            }

            if (this.columnSlot) {
                elements.push(this.columnSlot({
                    row: this.row,
                    column: this.column,
                }));
            } else if (this.column.property && this.row.hasOwnProperty(this.column.property)) {
                elements.push(this.row[this.column.property]);
            }

            return elements.length > 0 ? elements : [
                '',
            ];
        },

        toggleChildren (event) {
            event.stopPropagation();
            this.$emit('toggle-children');
        },
    },
};
