<template>
<div>
    <div style="width:40%">
        <form>
            <input placeholder="Enter your text" v-model="newText">
            <input placeholder="Enter date" v-model="newDate">
            <button @click="add">Add me</button>
        </form>
    </div>
    <div style="width:40%">
        <input type="radio" v-model="checked" value="showall" id="showall"><label for="showall">Show all</label>
        <input type="radio" v-model="checked" value="showdone" id="showdone"><label for="showdone">Show done</label>
        <input type="radio" v-model="checked" value="shownotdone" id="shownotdone"><label for="shownotdone">Shoe not done</label>
    </div>
    <div style="display:block;border:1px solid green">
        <todo1 v-for="(item,index) in dataTableHandled" @my-click="handleClick" @del-click="deleteClick" @fix-click="fixClick" :item="item" :key="index" v-if="item.seen">
        </todo1>
    </div>
    <modal2 v-model="showModal">
        <h4 slot="header">Fix todo</h4>
        <div>
            <div>Text</div>
            <input v-model="fixTodo.text">
            <div>Data</div>
            <input v-model="fixTodo.date">
        </div>
        <div slot="footer">
            <button @click="onFixTodo">Fix</button>
            <button @click="cancel">Cancel</button>
        </div>
    </modal2>
</div>
</template>

    <script>
    import message1 from './message1.vue'
    import message2 from './message2.vue'
    export default {
      name: 'runIt',

      data () {
        return {
          newText: '',
          newDate: '',
          seen: true,
          checked: 'shownotdone',
          showModal: false,
          selectTodo: {},
          fixTodo: {},
          dataTable: [
            {
              text: 'travel around the world',
              date: '2107-12-6',
              seen: true,
              act: false
            },
            {
              text: 'go to the beach',
              date: '2107-12-6',
              seen: true,
              act: false
            },
            {
              text: 'play football',
              date: '2107-12-6',
              seen: true,
              act: true
            },
            {
              text: 'ride the sky',
              date: '2107-12-6',
              seen: true,
              act: true
            }
          ]
        }
      },

      methods: {
        handleClick (item) {
          item.act = !item.act
        },
        deleteClick (item) {
          item.seen = false
        },
        fixClick (item) {
          item.showModal = true
          this.selectTodo = item
          this.fixTodo = {
            ...item
          }
        },
        add () {
          this.dataTable.push({
            text: this.newText,
            date: this.newDate,
            seen: true,
            act: false
          })
        },
        onFixTodo () {
          this.showModal = false
          Object.assign(this.selectedTodo, this.fixTodo)
        },
        cancel () {
          this.showModal = false
        }
      },

      components: {
        'todo1': message1,
        'modal2': message2
      },

      computed: {
        dataTableHandled () {
          const newData = []
          if (this.checked === 'showall') {
            return this.dataTable
          } else if (this.checked === 'showdone') {
            for (const item of this.dataTable) {
              if (item.act) {
                newData.push(item)
              }
            }
            return newData
          } else if (this.checked === 'shownotdone') {
            for (const item of this.dataTable) {
              if (!item.act) {
                newData.push(item)
              }
            }
            return newData
          }
        }
      }
    }

</script>

<style>

</style>
