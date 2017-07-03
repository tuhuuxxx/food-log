<template>
    <div>
        <div style="width: 40%;margin-left: 30%;">
            <form>
                <input v-model="newText" placeholder="text">

                <input v-model="newDate" placeholder="date">
                
                <button style="background: green;color: white" @click="add">Add</button>
            </form>
        </div>
        <div style="width:40%;margin-left: 30%;">
            <input type="radio" id="showall" value="showall" v-model="checked">
            <label for="showall">Show All</label>
            <input type="radio" id="done" value="done" v-model="checked">
            <label for="done">Done</label>
            <input type="radio" id="notdone" value="notdone" v-model="checked">
            <label for="notdone">Not Done</label>
        </div>
        <div style="display: block;">
            <todo v-for="(item, index) in dataTable1" :key="index" v-if="item.seen" @my-click="handleClick" :item="item" @del-click="delClick" @fix-click="fixClick">
            </todo>
        </div>

        <modal v-model="showModal">
            <h4 slot="header">Fix Todo</h4>

            <div>
                <div>Text</div>
                <input v-model="fixTodo.text">
                <div>Date</div>
                <input v-model="fixTodo.date">
            </div>

            <div slot="footer">
                <button @click="onFixTodo">Fix</button>
                <button @click="cancel">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>
  import Todo from './Todo.vue'
  import Modal from './Modal.vue'

  export default {
    name: 'problem',

    data () {
      return {
        newText: '',
        newDate: '',
        checked: 'showall',
        showModal: false,
        seen: true,
        selectedTodo: {},
        fixTodo: {},
        dataTable: [
          {
            text: 'Eat',
            date: '2017-10-15',
            act: false,
            seen: true
          },
          {
            text: 'Reading Book',
            date: '2017-10-16',
            act: false,
            seen: true
          },
          {
            text: 'See Movie',
            date: '2017-10-18',
            act: false,
            seen: true
          }
        ]
      }
    },

    methods: {
      handleClick (item) {
        item.act = !item.act
      },
      delClick (item) {
        item.seen = false
      },
      fixClick (item) {
        this.showModal = true
        this.selectedTodo = item
        this.fixTodo = {
          ...item
        }
      },
      add () {
        this.dataTable.push({
          text: this.newText,
          date: this.newDate,
          act: false,
          seen: true
        })
      },
      onShowModalInput (value) {
        this.showModal = value
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
      Todo,
      'modal': Modal
    },

    computed: {
      dataTable1 () {
        const newData = []
        if (this.checked === 'showall') {
          return this.dataTable
        } else if (this.checked === 'done') {
          for (const item of this.dataTable) {
            if (item.act === true) {
              newData.push(item)
            }
          }
          return newData
        } else if (this.checked === 'notdone') {
          for (const item of this.dataTable) {
            if (item.act === false) {
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
    .box {
        width: 35%;
        margin-left: 30%;
        border: 1px solid black;
    }
</style>
