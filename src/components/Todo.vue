<template>
    <div>
        <div @click="handleClick" class="todo" :class="{ 'todo-active': item.act }">
            <div style="width:90%;float:left">
                <div>{{ item.text }}</div>
                <div>{{ item.date }}</div>  
            </div>

            <div style="float: left;width: 10%">
                <form>
                    <input type="checkbox" title="Delete" @click="delClick">
                    <button @click="fixClick">Fix</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'todo',
      props: ['item'],
      methods: {
        handleClick () {
          this.$emit('my-click', this.item)
        },
        delClick () {
          this.$emit('del-click', this.item)
        },
        fixClick (event) {
          event.stopPropagation()
          this.$emit('fix-click', this.item)
        }
      }
    }
</script>

<style>
    .todo {
        text-align: center;
        width: 35%;
        margin-left: 30%;
        border: 1px solid rgba(0, 0, 0, 0.3);
        padding-bottom: 50px;
    }

    .todo.todo-active {
        background: green;
        color: white;
    }
</style>
