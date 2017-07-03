<template>
<div>
    <div @click="handleClick" class="todo1" :class="{'todo1-active': item.act}">
       <div style="width:90%;float:left">
            <div>{{item.text}}</div>
            <div>{{item.date}}</div>
       </div>
       <div style="width:10%;float:left">
           <form>
               <input type="checkbox" title="Delete" @click="deleteClick">
               <button @click="fixClick">Fix it</button>
           </form>
       </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'todo1',
  props: ['item'],
  methods: {
    handleClick () {
      this.$emit('my-click', this.item)
    },
    deleteClick () {
      this.$emit('del-click', this.item)
    },
    fixClick () {
      event.stopPropagation()
      this.$emit('fix-click', this.item)
    }
  }
}
</script>
<style>
.todo1 {
    text-align:center;
    border:0.2px solid black;
}
.todo1 .todo1-active{
    background-color:lightgray;
    color:white;
}
</style>
