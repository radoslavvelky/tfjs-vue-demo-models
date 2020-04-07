<template>
  <p v-if="models.length < 1" class="empty-table">Loading</p>
  <div v-else id="app" class="small-container">
    <div class="top">
        <h1>Demo Vue - MetaData Overview</h1>
        <ActionButtons
          @edit:useCase="editUseCase"
          @add:model="addModel"
          @save="commit"
          @rollback="rollback"
          @reload="reload"
          @delete:model="deleteModel"
        />
    </div>    

    <div id="tabs" class="container">         
        <div class="tabs">
            <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">Assembly</a>
            <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">MetaData</a>
            <a v-on:click="activetab=3" v-bind:class="[ activetab === 3 ? 'active' : '' ]">Effective</a>
        </div>

        <div class="content">
            <div v-if="activetab === 1" class="tabcontent">
              <tableContainer
                  :columns="columns"
                  :rows="rows2"
                  :update-counter="updateCounter"
                  :classes="classes"
                  :filter="filter"
                  :page="page"
                  :items-per-page="pagingSize"
                  :selectable="selectable"
                  :call-children="callChildren"                  
                  @filter-change="filterChanged"
                  @page-change="pageChanged"
                  @selection-change="selectionChanged"
                  export-name="test"
                  v-on:scroll.native="handleScroll"
              >  
                <!--   
                  :call-rows="callRows"
                  :call-temp-rows="callTempRows"
                -->
                  <!--&lt;!&ndash; Will be applied on the name column for the rows with an _id of tiger &ndash;&gt;-->
                  <!--<template slot="name_tiger" slot-scope="props">test cell - {{ props.row[props.column.property] }}</template>-->
                  <!--&lt;!&ndash; Will be applied on the city column &ndash;&gt;-->
                  <!--<template slot="city" slot-scope="props">test column - {{ props.row.city }}</template>-->
                  <!--&lt;!&ndash; Will be applied on the row with _id tiger &ndash;&gt;-->
                  <!--<template slot="_tiger" slot-scope="props">test row - {{ props.row[props.column.property] }}</template>-->
                  <!--<template slot="no-rows">Geen resultaten</template>-->
                  <!--<template slot="sort-icon" slot-scope="props">{{ props.direction === null ? 'null' : (props.direction ? 'up' : 'down') }}</template>-->
                  <!--<template slot="toggle-children-icon" slot-scope="props">{{ props.expanded ? 'open' : 'closed' }}</template>-->
              </tableContainer>
              <div v-if="selectable" class="vue-ads-p-2 vue-ads-text-sm">
                  <div class="vue-ads-mb-2">Selected Rows: {{selectedRows}}</div>
              </div> 

            </div>
            <div v-if="activetab === 2" class="tabcontent">
              <div class="tables">
                <model-table class="fl-3" :models="models" :selectedmodel="selected" @edit:model="editModel" />
                <div class="table-types-and-properties">      
                    <entity-table class="fl-3" :selectedmodel="selected" :selectedtype="selectedType" :entities="types" :usecase="usecase" :session="session" @edit:type="editType" />
                    <property-table class="fl-3" :selectedmodel="selected" :selectedtype="selectedType" :properties="properties" :usecase="usecase" :session="session" @edit:property="editProperty" />
                </div>
              </div>
            </div>
            <div v-if="activetab === 3" class="tabcontent">
                Under construction!
            </div>
        </div>
      
    </div>


  </div>
</template>

<script>
import "@/assets/css/tailwind.css";
//import "@/node_modules/@fortawesome/fontawesome-free/css/all.css"; 

import ModelTable from "@/components/ModelTable.vue";
import EntityTable from "@/components/EntityTable.vue";
import PropertyTable from "@/components/PropertyTable.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import TableContainer from "@/components/TableContainer.vue";
import classes from "@/services/defaultClasses"; 

//import * as tfjs from "@/utils/tf.js";
import * as tfjsUtils from "@/utils/tfjsUtils.js";

export default {
  name: "app",
  components: {
    ModelTable,
    EntityTable,
    PropertyTable,
    ActionButtons,
    TableContainer
  },

  data() {
    let rows2 = [];
    let columns = [
        {
            property: 'model',
            title: 'Model',
            direction: null,
            filterable: true,
            visible: true,
            hideble: false,
            menu: true,
        },
        {
            property: 'name',
            title: 'Name',
            direction: null,
            filterable: true,
            visible: true,
            hideble: true,
        },
        {
            property: 'version',
            title: 'Version',
            direction: null,
            filterable: true,
            groupable: true,
            groupCollapsable: true,
            hideOnGroup: true,
            visible: true,
            hideble: true,
        },

        /*
        {
            property: 'budget',
            title: 'Budget',
            direction: null,
            filterable: true,
            groupable: true,
            groupBy: (budget) => {
                if (budget < 100000) {
                    return '< 100 000';
                } else if (budget < 200000) {
                    return '< 200 000';
                } else if (budget < 300000) {
                    return '< 300 000';
                } else if (budget < 400000) {
                    return '< 400 000';
                } else {
                    return '> 400 000';
                }
            },
        },
        */
    ];
    /* eslint-disable no-unused-vars */
    classes['1_/5'] = (row, column) => {
        if (row.budget < 100000) {
            return {
                'vue-ads-bg-red-500': true,
            };
        }

        return {};
    }; 
    /* eslint-enable no-unused-vars */

    return {
      models: [],
      types: Array,
      properties: Array,
      activetab: 1,
      selected: {
        model: null
      },
      selectedType: {
        entity: null 
      },
      session: null,
      mdResolver: null,
      usecase: {
        value: ""
      },

      rows2,
      columns,
      classes,
      filter: '',
      page: 0,
      selectable: true,
      selectedRows: 0, 
      pagingSize: 25,
      loadedCompletePage: false,
      updateCounter: 0,
    }
  },

  computed: {
      nothingSelected () {
          return this.selectedRowIds.length === 0;
      },
  },
 
  methods: {
    async configureGmSession(session) {
      this.session = session;
    },
    
    getCurrentSelection() {
       let children = this.$children[4];
       return children.getCurrentSelection();
    },
    
    getFirstSelectedItem() {
       let children = this.$children[4];
       return children.getFirstSelectedItem();
    },

    deselectAll() {
      //RVE not sure why this hangs
      //this.selected.model = null;
    },    

    async tfLogin() {
      await tfjsUtils.tfAuthenticate();
      this.session = await tfjsUtils.getSession("cortex");
      console.log(this.session);

      //this.session.listeners.addManipulationLister(ml => {
      //  console.log(ml);
      //});
    },

    async setContent(content) {
      //TO DO - now on test create own Query, did not work with received "content"
      if (content == null) {
        //if (this.session == null) 
        //    await this.tfLogin(); 

        try {
          const q = tfjsUtils.tf.parse(
            "from com.braintribe.model.meta.GmMetaModel m where (m.name ilike 'tribefire.cortex*' or m.name ilike 'com.braintribe*') order by m.name"
          );

          q.traversingCriterion = tfjsUtils.tf.tc.all();
          this.session.query(q).then(result => {
            this.models = result.toArray();
            this.loadedCompletePage = false;
            this.getAssemblyRows(this.models);
            /*
            result.toArray().forEach(m => {
              this.session.listeners.addManipulationLister(m, ml => {console.log({ model: ml });});
            });
            */
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
   async getTypes(model) {
      try {
        if (model == null)
          this.types = [];
        else
          this.types = model.types.toArray();
      } catch (error) {
        this.types = [];
      }
    },
   async getProperties(entity) {
      try {
        if (entity == null) 
          this.properties = [];
        else
          this.properties = entity.properties.toArray();
      } catch (error) {
        this.properties = [];
      }
    },
    async editUseCase(useCase) {
      this.usecase = useCase;  
    },

    async editModel(updatedModel) {
      this.selected = updatedModel;
      this.getTypes(updatedModel);
      /*
      updatedModel.types.toArray().forEach(p => {
      });
      */
    },     
    async editType(updatedType) {
      this.selectedType = updatedType;
      this.getProperties(updatedType);
    },
    /*
    async commit() {
      this.session.commit();
    },
    */
    async rollback() {
      this.session.rollback();
    },
    async reload() {
      //this.model = null;
      this.models = [];
      this.getModels();
    },

    async handleScroll() {
      //find grid div and detect when scrolled on the bottom, than load next page
      const myDiv = document.getElementById("grid"); 
      if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
        if (!this.loadedCompletePage)
          this.getAssemblyRows(this.models);
      }
    },

    async getAssemblyRows(genericEntitys) {
      const iFrom = this.page * this.pagingSize; 
      const iTo = Math.min(iFrom + this.pagingSize, genericEntitys.length); //genericEntitys.length

      if (iFrom > iTo) {
        this.loadedCompletePage = true;
        return;
      }

      for (var i = iFrom; i < iTo; i++) {
        const entity = genericEntitys[i];
        if (entity == null)
           continue;

        const row = this.getRowFromEntity(entity, null);
        this.rows2.push(row);
       }

      this.page += 1;
    },

    getRowFromEntity(entity, parentRow) {
      let iconUrl = "";   
      try {
          const entityResolver = this.session.modelAccessory.metaData.entityTypeSignature(entity.$type.typeSignature);
          const iconMetaData = entityResolver.exclusive("com.braintribe.model.meta.data.display.Icon");
          if (iconMetaData != null) {
            const icon = iconMetaData.icon;
            iconUrl = this.getUrlFromIcon(icon);
          }
      } catch (error) {
          iconUrl = "";
      } 

      let childs = [];   
      const properties = entity.$type.properties;
      const genericProperties = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.GmEntityType").properties;
      var entityTypePropertyList = new Array; 
      for (var k = 0; k < properties.length; k++) {
            const property = properties[k];
            if (!genericProperties.includes(property))
              entityTypePropertyList.push(property);  
      } 

      var row = {            
        name : entity.id,
        version : entity.version,
        model : this.getShortName(entity.id),
        _selectable : true,
        _showChildren: false,
        _hasIcon: (iconUrl != ""),
        _iconUrl: iconUrl,
        _entity: entity,
        _property: null,
        _loaded: true,
        _rootRow: parentRow,
        _updateCounter: 0,
      };      

      let childParentRow = null;
      if (parentRow == null)
          childParentRow = row;

      for (var j = 0; j < entityTypePropertyList.length; j++) {
        const property = entityTypePropertyList[j];
        var rowChild = {            
          name : property.id,
          version : "",
          model : property.name,
          _selectable : true,
          _children : [],
          _showChildren: false,
          _hasChildren: false,
          _hasIcon: (iconUrl != ""),
          _iconUrl: "",
          _entity: null,
          _property: property,
          _loaded: false,
          _rootRow: childParentRow,
          _updateCounter: 0,
        };
        childs.push(rowChild);
      }

      row._children = childs,
      row._hasChildren = childs.length > 0,

      this.updateCounter += 1;
      return row; 
    }, 

    getShortName(fullName) {
      var index = fullName.lastIndexOf(".");
      var index2 = fullName.lastIndexOf(":");
      if (index2 > index)
          index = index2;
      if (index > 0) {
        index++;
        return fullName.substring(index);
      } else
         return fullName;
    },

    getUrlFromIcon (icon) {
        if (icon == null)
           return "";

        let resource;
        const iconType = icon.$type; 
        if (iconType === tfjsUtils.tf.types.getEntityType("com.braintribe.model.resource.SimpleIcon")) {
            resource = icon.image; 
        } else if (iconType === tfjsUtils.tf.types.getEntityType("com.braintribe.model.resource.AdaptiveIcon")) {
            const representations = icon.representations.toArray();

            //RVE - here need find the best image depending on size...based on com.braintribe.model.resource.specification.PixelDimensionSpecification
            //now just take first image
            for (var i = 0; i < representations.length; i++) {
              const representation = representations[i];
              if (representation != null) {
                 resource = representation;
                 break;
              }                  
            }
        } else {
          return "";
        }
        return this.session.resources.url(resource).asString();
    } ,

    /* eslint-disable no-unused-vars */
    sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    filterChanged (filter) {
        this.filter = filter;
    },

    pageChanged (page) {
        this.page = page;
    },

    selectionChanged (selectedRows) {
        this.selectedRows = selectedRows.length;
    },


    /*
    async callRows (indexesToLoad) {
        await this.sleep(1000);

        return indexesToLoad.map(index => {
            return {
                name: 'Herrod Chandler',
                function: 'Sales Assistant',
                city: 'San Francisco',
                id: '9608',
                since: '2012/08/06',
                budget: 137500,
            };
        });
    },
    */

    async callChildren (parent) {
        await this.sleep(100);
        //load properties

        let topParentRow = parent;
        if (parent._rootRow != null)
           topParentRow = parent._rootRow; 

        for (var i=0; i < parent._children.length; i++) {
             const child = parent._children[i];

             if (child._loaded)
                continue;

             if (child._property != null) {
               const property = child._property;
               if (property.isAbsent(parent._entity)) {
                 this.loadAbsentProperty(property, parent._entity);
               }

               if (property.type.isCollection) {
                 const getValue = property.get(parent._entity);
                 const childCollection = getValue.toArray();

                 child.model = property.name + " (" + childCollection.length + ")" ;

                 for (var j=0; j < childCollection.length; j++) {
                     const childEntity = childCollection[j];

                     const genericType = tfjsUtils.tf.types.getEntityType("com.braintribe.model.generic.GenericEntity");
                     if (!genericType.isAssignableFrom(childEntity.$type))
                        continue;

                     const newRow = this.getRowFromEntity(childEntity, topParentRow);
                     child._children.push(newRow);
                 }
                 child._hasChildren = (childCollection.length > 0);
               }  else {
                 child._hasChildren = false;
               }

               child._loaded = true;
             } else if (child._entity != null) {
                 //this.getRowFromEntity(child._entity);
             }

        }

        if (topParentRow != null)
            topParentRow._updateCounter += 1;

        return parent._children;
    },

    loadAbsentProperty(property, entity) {
      if (property == null || entity == null)
         return;

      const absence = property.getAbsenceInformation(entity);   
    },

    /*
    async callTempRows () {
        await this.sleep(1000);

        return {
            rows: [],
            total: 0,
        };
    },
    */

    /* eslint-enable no-unused-vars */
  }
};
</script>

<style>
.tables {
    display: flex;
    flex-direction: row;
    max-height: 400px;
  }
  .table-types-and-properties {
    display: flex;
    flex-direction: column;
    max-height: 400px;
  }
  .cards {
    margin-top: 60px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 60vw;
  }
  .fl-1 {
    max-height: 450px;
    overflow: auto;
  }

/* Style the tabs */
.tabs {
    overflow: hidden;
    margin-left: 20px;
    margin-bottom: -2px; 
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 5px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 1px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 1px solid #fff;
    cursor: default;
}

/* Style the tab content */
.tabcontent {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1;
    overflow: auto;
    max-height: max-content;
    min-height: 550px;
}     
</style>