<template>
    <div id="root">
        <button @click="showMe">Show all</button>
        <div v-show="isVisible"><li v-for="(task,index) in tasks" v-bind:key="task" >{{index+1}}:{{task.todo}}-{{task.date}}-{{task-completed}}</li></div>
        <button @click="showDone">Done</button>
        <div v-show="done">
            <li v-for="task in tasks" v-bind:key="task" v-if="task.completed">{{tasks.todo}}</li>
        </div>
        <button @click="showNotDone">Not Done</button>
        <div v-show="notDone"><li >{{tasks.todo}}</li></div>
  </div>
</template>
<script>
  export default {
      name: 'dmDuy',
      data(){
          return {
              task:'',
              isVisible:false,
              done:false,
              notDone:false,
              tasks:[
                  {todo:'go to bed', date:29,completed:true},
                  {todo:'clean the door',date:30,complete:false},
                  {todo:'give a child',date:1,completed:false}
              ]
                  
              
          }
      },
      methods:{
          showMe(){
               isVisible=true;
          },
          showDone(){
              done==true;
          },
          showNotDone(){
              notDone=true;
          }
      }
      
  }
</script>