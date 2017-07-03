<template>
<div>
    <div>
         <form>
            <input placeholder="Enter your text" v-model="newText">
            <input placeholder="Enter date" v-model="newDate">
            <button @click="add">Add me</button>
        </form>
    </div>
     <div>
        <input type="radio" v-model="checked" value="showall" id="showall"><label for="showall">Show all</label>
        <input type="radio" v-model="checked" value="showdone" id="showdone"><label for="showdone">Show done</label>
        <input type="radio" v-model="checked" value="shownotdone" id="shownotdone"><label for="shownotdone">Shoe not done</label>
    </div>
</div>
</template>

<script>
  export default {
    name: 'Demo',

    data () {
      return {
        newText: '',
        newDate: '',
        checked: 'showall'
      }
    },

    methods: {
      add () {
        this.dataTable.push({
          text: this.newText,
          date: this.newDate,
          seen: true,
          act: false
        })
      }
    }
}
</script>
