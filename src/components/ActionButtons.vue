<template>
  <section class="actions">
    <!-- <button @click="handleAdd">Add</button> -->
    <!-- <button @click="$emit('save')">Save</button>
    <button @click="$emit('reload')">Reload</button>
    <button @click="$emit('delete:employee')">Delete</button> -->
    <!--       @input="$emit('input', $event.target.value)" -->
    <input v-model="usecase" 
             @input="editUseCase($event.target.value)"
             @keydown.enter="editing=false"
             type="text" 
             placeholder="Use Case "> 
    <!-- <button @click="$emit('add')">Add</button> -->
  </section>
</template>
 
<script lang="js">
  export default  {
    name: 'AcctionButtons',
    props: [],
    mounted() {
      
    },
    data() {
      return {
      }
    },
    methods: {
      editUseCase(useCase) {
        this.$emit("edit:useCase", useCase);
      },
    },
    
    computed: {
 
    }
}
</script>
 
<style scoped>
.actions {
  margin: 10px;
}
button {
  margin: 0 0.5rem 0 0;
}
</style>