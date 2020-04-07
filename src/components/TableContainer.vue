<template>
    <div id="grid" class="grid">
         <grid-table
            ref="table"
            :columns="columns"
            :rows="rows"
            :update-counter="updateCounter"
            :filter="debouncedFilter"
            :selectable="selectable"
            :start="start"
            :end="end"
            :classes="classes"
            :call-rows="callRowsFunction"
            :call-children="callChildrenFunction"
            :call-temp-rows="callTempRowsFunction"
            :slots="$scopedSlots"
            @total-filtered-rows-change="totalFilteredRowsChanged"
            @export="exportTable"
            @selection-change="selectionChanged"
        />
        <slot name="bottom"
              :total="total"
              :page="page"
              :itemsPerPage="itemsPerPage"
              :pageChanged="pageChanged"
              :rangeChanged="rangeChanged"
        >
            <!--
            <vue-ads-pagination
                :total-items="total"
                :page="page"
                :items-per-page="itemsPerPage"
                @page-change="pageChanged"
                @range-change="rangeChanged"
            />
            -->
        </slot>
    </div>
</template>

<script>
import '../assets/css/tailwind.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css'; 
//import Vue from 'vue';

//import VueAdsPagination from 'vue-ads-pagination';
import debounce from '../services/debounce';

import GridTable from './Table';

import defaultClasses from '../services/defaultClasses';

export default {
    name: 'tableContainer',

    components: {
        GridTable,
        //VueAdsPagination,
    },

    props: {
        columns: {
            type: Array,
            required: true,
        },

        updateCounter: {
            type: Number,
            default: 0,
        },

        rows: {
            type: Array,
            default: () => [],
        },

        filter: {
            type: String,
            default: '',
        },

        selectable: {
            type: Boolean,
            default: false,
        },

        classes: {
            type: Object,
            default: () => defaultClasses,
        },

        callRows: {
            type: Function,
        },

        callTempRows: {
            type: Function,
        },

        callChildren: {
            type: Function,
        },

        debounceFilterTime: {
            type: Number,
            default: 500,
        },

        page: {
            type: Number,
            default: 0,
        },

        itemsPerPage: {
            type: Number,
            default: 10,
        },

        exportName: {
            type: String,
            default: '',
        },

        fullExport: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            total: this.rows.length,
            start: null,
            end: null,
            debouncedFilter: this.filter,
            debounce: debounce(
                this.filterChange,
                this.debounceFilterTime
            ),
            exportData: [],
            exportFields: {},
            exportTitle: '',
        };
    },

    watch: {
        updateCounter: {
            handler: 'rowsChanged',
            immediate: true,
        },

        rows: {
            handler: 'rowsChanged',
            immediate: true,
        },

        filter: {
            handler: 'filterChanged',
            immediate: true,
        },
    },

    computed: {
        hasExport () {
            return this.exportName.length > 0;
        },

        filterClasses () {
            return {
                'vue-ads-flex-grow': true,
                'vue-ads-mr-2 ': this.hasExport,
            };
        },

        callRowsFunction () {
            return this.callRows || (() => []);
        },

        callTempRowsFunction () {
            return this.callTempRows || (() => []);
        },

        callChildrenFunction () {
            return this.callChildren || (() => []);
        },
    },

    methods: {
        getCurrentSelection() {
            return null;
        },
    
        getFirstSelectedItem() {
            return null;
        },

        rowsChanged () {
            this.total = this.rows.length;
        },

        filterChanged (filter) {
            if (this.callRows) {
                this.debounce(filter);

                return;
            }

            this.filterChange(filter);
        },

        async filterChange (filter) {
            this.debouncedFilter = filter;
            this.$emit('filter-change', filter);
            this.$emit('page-change', 0);
        },

        selectionChanged (rows) {
            this.$emit('selection-change', rows);
        },

        collectExportData () {
            this.$refs.table.exportTable(this.exportName, this.fullExport);
        },

        exportTable (exportData) {
            this.exportFields = exportData.fields;
            this.exportData = exportData.data;
            this.exportTitle = exportData.title;
        },

        pageChanged (page) {
            this.$emit('page-change', page);
        },

        rangeChanged (start, end) {
            this.start = start;
            this.end = end;
        },

        totalFilteredRowsChanged (total) {
            this.total = total;
        },

        /*
        setMenu: function(top, left) {
          
            let largestHeight = window.innerHeight - this.$$.right.offsetHeight - 25;
            let largestWidth = window.innerWidth - this.$$.right.offsetWidth - 25;

            if (top > largestHeight) top = largestHeight;

            if (left > largestWidth) left = largestWidth;

            this.menuTop = top + 'px';
            this.menuLeft = left + 'px';
        },

        closeMenu: function() {
            this.viewMenu = false;
        },

        openMenu: function(e) {
            this.viewMenu = true;

            Vue.nextTick(function() {
                this.$$.right.focus();

                this.setMenu(e.y, e.x)
            }.bind(this));
            e.preventDefault();
        }
        */

    },
};
</script>

<style>
.grid {
    max-height: 550px;
    overflow: scroll;
    height: 100%;
  }

#right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #fbd38d;
    color: black;
}  
</style>
