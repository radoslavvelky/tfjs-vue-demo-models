<template>
  <div class="table-with-menu">

    <!-- Menu  -->
    <nav class="header__nav" v-bind:style="{ left: menuLeft + 'px', top: menuTopdisplay + 'px'}">
    <ul class="header__navbar">
        <li class="header__item">
        <a href="#" class="header__link">
            <transition name="slide-fade">
            <!-- Header Navigation Menu Icons -->
            <!-- Menu button
            <button class="header--button" v-if="!viewMenu" key="off" @click="viewMenu = true">
                <svg viewBox="0 0 24 24" class="header--icon">
                <title>Columns Menu</title>
                <path fill="currentColor" d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
                </svg>
            </button>
            -->
            <!-- Close button
            <button class="header--button" v-else key="on" @click="viewMenu = false">
                <svg viewBox="0 0 24 24" class="header--icon">
                <title>Close</title>
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
            </button>
            -->
            </transition>
        </a>
        <!-- Dropdown Menu -->
        <transition name="dropdown">
            <div class="dropdown__menu" v-bind:class="{ active: viewMenu }" v-if="viewMenu" >
                <ul class="dropdown__menu-nav">
                    <li v-for="(column, key) in columns"
                        :key="key"
                        class="dropdown__menu-item"
                    >
                        <a href="#" class="dropdown__menu-link" @click="itemClick(column)">
                            <input class="menu_checkbox" type="checkbox" :checked="itemChecked(column)">
                            <!--
                            <div class="dropdown__menu-svg">
                                <svg viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z" />
                                </svg>
                            </div>
                            -->
                            <div class="dropdown__menu-text">{{column.title}}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </transition>
        </li>
    </ul>
    </nav>


    <!-- Table Grid -->
    <table
        :class="tableClasses"
        class="vue-ads-w-full vue-ads-font-sans"
        style="border-collapse: collapse;"
        @click="closeMenu"
    >
        <!-- TABLE HEADER -->
        <thead>
            <tr
                :class="headerRowClasses"
            >
                <vue-ads-header-cell
                    v-for="(column, key) in nonGroupedColumns"
                    :key="key"
                    :column="column"
                    :column-index="key"
                    :css-processor="cssProcessor"
                    :sort-icon-slot="sortIconSlot"
                    @sort="sort"
                    @group="group"
                    @menu="showMenu"
                />
            </tr>
        </thead>
        <!-- TABLE ROWS -->
        <tbody>
            <tr
                v-if="infoVisible"
            >
                <td
                    :class="infoClasses"
                    :colspan="nonGroupedColumns.length"
                >
                    <span v-if="loading">
                        <slot name="loading">Loading...</slot>
                    </span>
                    <span v-else>
                        <slot name="no-rows">No results found</slot>
                    </span>
                </td>
            </tr>
            <template
                v-else
                v-for="(row, rowKey) in flattenedRows"
            >
                <vue-ads-row
                    v-if="!row._meta.groupColumn"
                    :key="rowKey"
                    :row="row"
                    :row-index="rowKey"
                    :columns="nonGroupedColumns"
                    :slots="rowSlots"
                    :toggle-children-icon-slot="toggleChildrenIconSlot"
                    :css-processor="cssProcessor"
                    @toggle-children="toggleChildren(row)"
                    @click.native="selectRow($event, row, rowKey)"
                />
                <vue-ads-group-row
                    v-else
                    :key="rowKey"
                    :row-index="rowKey"
                    :row="row"
                    :slots="rowSlots"
                    :css-processor="cssProcessor"
                    :toggle-children-icon-slot="toggleChildrenIconSlot"
                    :colspan="columns.length"
                    @toggle-children="toggleChildren(row)"
                    @disable-group="group"
                    @sort="sort"
                />
            </template>
        </tbody>
    </table>
   </div>
</template>

<script>
import rows from '../mixins/rows';
import columns from '../mixins/columns';
import filter from '../mixins/filter';
import slots from '../mixins/slots';
import pagination from '../mixins/pagination';
import styling from '../mixins/styling';
import async from '../mixins/async';
import sort from '../mixins/sort';
import groupBy from '../mixins/groupBy';
import flatten from '../mixins/flatten';
import exportData from '../mixins/exportData';
import selection from '../mixins/selection';

//import Vue from 'vue';
import VueAdsHeaderCell from './HeaderCell';
import VueAdsRow from './Row.vue';
import VueAdsGroupRow from './GroupRow.vue';

// Todo check if it's possible to increase the key only for non group rows
// => so even and odd non group rows have the same background
// Todo enable sort icon if column disapears or maybe also if it doesnt dissapear.
// Todo create slots for all new icons
// Todo create slots for header cells
// Todo check if you can add child rows reactive after some child rows are already initiated.
// Todo move sorting and grouping functionality to the wrapper => The result is a wrapper that have the components
// and a table with all the implemented features
// Todo toch sorten on unresolved data => to be sure the grouping will be well done.

export default {
    name: 'gridTable',

    components: {
        VueAdsHeaderCell,
        VueAdsRow,
        VueAdsGroupRow,
    },

    mixins: [
        rows,
        columns,
        slots,
        selection,
        filter,
        sort,
        groupBy,
        pagination,
        flatten,
        styling,
        async,
        exportData,
    ],

    data() {
        return {
          viewMenu: false,
          menuTop: 0,
          menuLeft: 0,
        }
    },

    computed: {
        totalVisibleRows () {
            const count = this.flattenedRows.length;
            this.totalVisibleRowsChanged(count);
            return count;
        },

        infoVisible () {
            return this.totalVisibleRows === 0 || this.loading;
        },
    },

    methods: {
        totalVisibleRowsChanged (totalVisibleRows) {
            this.cssProcessor.totalRows = totalVisibleRows === 0 ? 2 : totalVisibleRows + 1;
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

        openMenu: function(x, y) {
            this.viewMenu = true;

            Vue.nextTick(function() {
                this.$$.right.focus();

                this.setMenu(y, x)
            }.bind(this));
            //e.preventDefault();
        },
        */

        async closeMenu() {
           this.menuTop = -200;
           this.menuLeft = -200;
           this.viewMenu = false;
        },

        async showMenu(x, y, column) {
        //showMenu() {
            if (column == null)
               return;


            this.menuTop = y;
            this.menuLeft = x;
            this.viewMenu = true;   
            //this.openMenu(x, y);
        },

        itemChecked(column) {
           if (column == null)
             return false;

           return column.visible;
        },
 
        async itemClick(column) {
           //this.closeMenu();  
           
           if (column == null)
             return;

           if (column.hideble) 
             column.visible = !column.visible;  

           /*
           for (var i=0; i < this.columns.length; i++) {
               const column = this.columns[i];
               if (!column.visible) {
                  column.visible = true;
                  return;
               }                   
           }
           */
        }
    },

};
</script>

<style>

hr {
  border: 0;
  height: 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--color-gray);
}

.header {
  padding: 2rem 5rem 2rem 5rem;
}

 .header__nav {
    position: absolute;
  }

  .header__navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .header__item {
    padding: 1rem;
  }
  .header--icon {
    width: 1.65rem;
    height: 1.65rem;
  }
  .header--button {
    top: 0;
    right: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
  }
  .header--button:focus {
      outline: 0;
  }

.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  height: auto;
  min-width: 150px;
  /* margin-top: 1rem; */
  overflow-y: auto;
  /* padding: 2rem 1rem 2rem 0rem; */
  border-radius: 2px;
  background-color: white;
  border: 1px solid lightgray;
  background-clip: padding-box;
}
.dropdown__menu-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.2rem 0 0.2rem 0.7rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0 50px 50px 0;
}
.dropdown__menu-link:hover {
      background-color: #fbd38d;
  }
  .dropdown__menu-link-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  .dropdown__menu-link-text {
    margin-left: 1rem;
    margin-right: 1rem;
  }

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.main {
  margin: 6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.main__subtitle {
    color: #4f5959;
    margin-bottom: 2rem;
}
.main__link {
    margin-right: 1.5rem;
    display: inline-block;
}

.main__link:last-child {
      margin-right: 0;
}
.main__svg {
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
    color: #94a2b0;
}
.main__svg:hover {
      color: #fbd38d;
}

.menu_checkbox {
  margin-right: 10px;
}

</style>