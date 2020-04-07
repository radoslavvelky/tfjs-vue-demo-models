<template>
  <div id="model-table">
    <p v-if="models.length < 1" class="empty-table">No models</p>
    <table v-else>
      <thead>
        <tr>
          <th @click="sort('ModelName')">Model Name</th>
          <th @click="sort('ModelVersion')">Version</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="model.id && selectedmodel.id && (model.id.valueOf() == selectedmodel.id.valueOf()) ? 'selected' : ''"
          :key="model.id ? model.id.valueOf() : model.name"
          v-for="model in sortedModels"
          @click="editModel(model)"
        >
          <td><span class="expander" v-if="isFolder(model)">[{{ isOpen ? '-' : '+' }}]</span>{{  getShortName(model.name)}}</td>
          <td>{{model.version}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "model-table",
  props: {
    models: null,
    selectedmodel: {}
  },
  data() {    
    return {
      currentSort:'ModelName',
      currentSortDir:'asc',
    };
  },
  computed:{
    sortedModels:function() {
      return this.getPreparedModels().sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;

        var valA = "";
        var valB = "";

        if (this.currentSort === 'ModelName') {
          valA = this.getShortName(a.name);
          valB = this.getShortName(b.name);
        }
        if (this.currentSort === 'ModelVersion') {
          valA = a.version;
          valB = b.version;
        }

        if(valA < valB) return -1 * modifier;
        if(valA > valB) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    editModel(model) {
      if (model === null) return;
      this.$emit("edit:model", model);
    },

    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },

    isFolder(model) {
      let dependencies = model.dependencies.toArray();
      return (dependencies.length > 0);
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

    getPreparedModels() {
      var preparedModels = this.models;
      return preparedModels;
    },

    //  background-color: rgba(255, 255, 255, 0.1);

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

span.expander {
  padding-right: 5px;
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
</style>