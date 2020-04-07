<template>
  <div id="entity-table">
    <p v-if="entities.length < 1" class="empty-table">No entities</p>
    <table v-else>
      <thead>
        <tr>
          <th @click="sort('TypeName')">Type Name</th>
          <th v-for="column in columns" v-bind:key="column">{{getShortName(column)}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="entity.id && selectedtype.id && (entity.id.valueOf() == selectedtype.id.valueOf()) ? 'selected' : ''"
          :key="entity.id ? entity.id.valueOf() : entity.globalId"
          v-for="entity in sortedEntities"
          @click="editType(entity)"
        >
          <td>{{getShortName(entity.id) + getAddInfo(entity)}}</td>
          <td v-for="column in columns" v-bind:key="column" v-html="getMetaDataValue(entity, column)"
            
          >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

//          <th>Declaring Model</th>
//          <td>{{getModelShortName(entity.declaringModel)}}</td>


//<td v-for="column in columns" v-bind:key="column">{{getMetaDataValue(entity, column)}}</td>
import * as tfjsUtils from "@/utils/tfjsUtils.js";

export default {
  name: "entity-table",
  props: {
    selectedtype: {},
    entities: Array,
    session: null,
    usecase: {},
    selectedmodel: {}
  },
  data() {
    return {
        mdResolver: null,
        currentSort:'TypeName',
        currentSortDir:'asc',
        currentResolverModel: null,
        currentUseCase: "",
        columns:["com.braintribe.model.meta.data.prompt.Description",
                 "com.braintribe.model.meta.data.display.SelectiveInformation",
                 "com.braintribe.model.meta.data.prompt.Visible",
                 //"com.braintribe.model.meta.data.constraint.Mandatory", //Mostly used with Property (not need for Types - GmEntityType, GmEnumType)
                 //"com.braintribe.model.meta.data.prompt.Inline",        //same - mostly Property MetaData
                 "com.braintribe.model.meta.data.constraint.Instantiable",
                 "com.braintribe.model.meta.data.constraint.Deletable",
                 "com.braintribe.model.meta.data.constraint.NonDeletable",  //PredicateErasure example
                 ]
    };
  },
  computed:{
    sortedEntities:function() {
      return this.getPreparedEntities().sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;

        var valA = "";
        var valB = "";

        if (this.currentSort === 'TypeName') {
          valA = this.getShortName(a.id);
          valB = this.getShortName(b.id);
        }

        if(valA < valB) return -1 * modifier;
        if(valA > valB) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    editType(type) {
      if (type === null) return;
      //this.selectedentity = entity;
      this.$emit("edit:type", type);
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
    getModelShortName(model) {
      const fullName = model.name;
      return this.getShortName(fullName);
    },
    getPreparedEntities() {
      var preparedEntities = this.entities;
      return preparedEntities;
    },
    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    prepareMdResolver(model) {
      if (this.mdResolver != null && this.currentResolverModel  != null && this.currentResolverModel === model && this.currentUseCase === this.usecase)
         return;

      this.currentUseCase = this.usecase;

      if (model == null) {     
         this.mdResolver = this.session.modelAccessory.metaData.useCase(this.usecase);
         this.currentResolverModel = null;
         return;
      }
      //RVE - for MetaDataEditor here need to ask for Resolved based on current Model, not on Session.modelAccessory.metaData Resolver!!!
      //now used session resolver just for test
      this.currentResolverModel = model;
      this.mdResolver = tfjsUtils.tf.metadata.resolver(model).useCase(this.usecase);

      //this.mdResolver = this.session.modelAccessory.metaData;
    },
    getMetaDataValue(entity, metadataTypeSignature) {
        if (this.session == null)
            return this.getShortName(metadataTypeSignature);

        const entityTypeMetaData = tfjsUtils.tf.types.getEntityType(metadataTypeSignature); 
        //const genericMT = tfjsUtils.tf.types.get(entity.typeSignature); 

        //get the Model metadata Resolver (GbModelMetaDataContextBuilder)
        //just for test not need use .usecase()
        this.prepareMdResolver(this.selectedmodel);

        //get the Entity oe Enum metadata Resolver (GbEntityMetaDataContextBuilder) 
        let enumResolver = null;
        let entityResolver = null;
        let metaData = null;
           
        if (this.isEnum(entity)) {
          metaData = this.mdResolver.exclusive(entityTypeMetaData);
        }

        //check if is GmEnumType - so than need enumResolver
        if (entity.$type === tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.GmEnumType")) {
            try {
              enumResolver = this.mdResolver.enumType(entity);          
              metaData = enumResolver.exclusive(entityTypeMetaData);
            } catch (error) {
              return "erEnum";
            }
        } else {
          //is GmEntityType - so than need entityResolver
          try {
            entityResolver = this.mdResolver.entityType(entity);          
            //find metadata depending on TypeSignature
            metaData = entityResolver.exclusive(entityTypeMetaData);
          } catch (error) {
                try { 
                  entityResolver = this.mdResolver.entity(entity);          
                  metaData = entityResolver.exclusive(entityTypeMetaData);
                } catch (error) {
                  return "err";
                }
          }
        }

        //check if metadata are Predicate (value TRUE or FALSE)
        const isPredicate = this.getPredicate(entityTypeMetaData);

        if (isPredicate) {
            //check if is PredicateErasure
            const isPredicateErasure = this.getPredicateErasure(entityTypeMetaData) ;
            let predicateMetaData = entityTypeMetaData;
            //for PredicateErasure we need to get the Predicate parent type and ask on it, ask for PredicateErasure is not yet allowed!
            if (isPredicateErasure) 
                predicateMetaData = this.getPredicateEntityType(entityTypeMetaData);  

            //resolve Predicate value
            //checking if is Predicate -RVE not sure if ask for .is() or isTrue() nned to be discussed
            let predicateValue = null;
            if (entityResolver != null)
                 predicateValue = entityResolver.is(predicateMetaData); 
            else
                 predicateValue = enumResolver.is(predicateMetaData); 
            //var predicateValue = eResolver.isTrue(predicateMetaData);
            //for PredicateErasure we must get opposite value
            if (isPredicateErasure)
                predicateValue = !predicateValue;

            if (predicateValue)
               return "<img src='checked.svg' alt='check'/>";                
            else
               return "<img src='uncheck.svg' alt='uncheck'/>";                
        }

        if (metaData == null)
               return "";

        const decalredProperties = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.data.MetaData").properties; 
        const metaDataProperties = entityTypeMetaData.properties; 

        //find the metadata EntityType special property/properties
        var propertyList = new Array; 
        for (var i = 0; i < metaDataProperties.length; i++) {
             const property = metaDataProperties[i];
             if ((!decalredProperties.includes(property)) && (property.name != "inherited"))
                propertyList.push(property);  
        }
        
        //mostly have only one special property
        if (propertyList.length == 1) {
            const property = propertyList[0];
            const objectPropertyValue = property.get(metaData);

            var textValue = ""; 

						if (property.type.typeSignature === "com.braintribe.model.generic.i18n.LocalizedString") {
								textValue = this.getDefaultLocalized(objectPropertyValue, "");
						} else if (objectPropertyValue instanceof String) {
								textValue = objectPropertyValue;
						} else {
								//textValue = MetaDataEditorUtil.prepareStringValue(objectPropertyValue, propAndPredicateModelType, MetaDataEditorOverviewView.this.metaDataResolverProvider.getModelMetaDataContextBuilder(), MetaDataEditorOverviewView.this.valueRenderers, MetaDataEditorOverviewView.this.readOnly, useGray, useCase);
								textValue = "need prepare value depending on ValueRenderer...";  //Another not easy point :)
						}

            return textValue;
        } else if (propertyList.length > 1) {
            //Need to show them special way, e.g via SelectiveInfo
        }

        return metaData;
    },
    isEnum(entity) {
      return  (entity.$type === tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.GmEnumType"));  
    },
    getPredicate(entityTypeMetaData) {
        const predicateType = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.data.Predicate");
        return predicateType.isAssignableFrom(entityTypeMetaData);
    },
    getPredicateErasure(entityTypeMetaData) {
        const predicateType = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.data.PredicateErasure");
        return predicateType.isAssignableFrom(entityTypeMetaData);
    },
    getDefaultLocalized( localizedString, defaultIfNotAvailable) {  
      //get string localizad values, here I expect also needed changes from TFJS, to use already implemented tools for localization
      //now here in dome use always default value   
      if (localizedString == null) {
         return defaultIfNotAvailable;
      }
         
      const localizedValues = localizedString.GetLocalizedValues();
      if (localizedValues == null)
         return defaultIfNotAvailable; 

      const defaultValue = localizedValues.get("default");
      if (defaultValue == null)
         return defaultIfNotAvailable; 
      
      return defaultValue;   
    },
    getPredicateEntityType(entityTypeMetaData) {   
      //RVE - in case of PredicateErasure is returned Predicate superType...resolver can be asked for values only for Predicate types, not for PredicateErasure
      const predicateType = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.data.Predicate");
      const predicateErasureType = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.data.PredicateErasure");
      const metadataType = tfjsUtils.tf.types.getEntityType("com.braintribe.model.meta.data.MetaData");
      if (predicateErasureType.isAssignableFrom(entityTypeMetaData)) {
        let superTypes = entityTypeMetaData.superTypes.toArray(); 
        for (var i = 0; i < superTypes.length; i++) {
          let superType = superTypes[i];
          if (predicateType.isAssignableFrom(superType) && metadataType.isAssignableFrom(superType) && !predicateErasureType.isAssignableFrom(superType)) 
            return superType;
        }
      }
      return entityTypeMetaData;
    },
    getAddInfo(entity) {
      if (this.isEnum(entity))
         return " - Enum";
      return "";   
    }
  }
};
</script>

<style scoped>
table {
  flex: 1 0 auto;
}
table th {
  padding: 10px;
}
thead tr {
  background-color:rgb(199, 130, 1);
  color : black;
}

.empty-table {
  text-align: center;
}
tr {
    background-color: rgba(255, 255, 255, 0.06);
    cursor: pointer;
    transition: color 0.25s ease-out, background-color 0.25s ease-out;
  }
  tr:nth-child(2n) {
    background-color: rgba(255, 255, 255, 0.04);
  }
  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  td {
    padding: 10px;
  }
  
  tr.selected {
    background-color: rgb(87, 145, 240);
    color: white;
  }
  
  /*
  td:hover {
    background-color: rgba(255, 255, 255, 0.2);    
  }
 
  td.selected {
    background-color: rgb(35, 155, 5);
    color:white;
  }
  */


input[type=checkbox] + label::before {
   content: '\f0c8';
   font-family: FontAwesome;
   display: inline-block;
   padding-right: 5px;
} 

input[type=checkbox]:checked + label::before {
   content: '\f14a';
}

input {
  display:none;
 }  
</style>