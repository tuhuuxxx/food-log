<template>
<div class="root">
   <el-row style="margin-top:20px;">
      <el-radio  v-model="radio" label="Show All">Show All</el-radio>
      <el-radio  v-model="radio" label="Show Eat">Show Eat</el-radio>
      <el-radio  v-model="radio" label="Show Not Eat">Show Not Eat</el-radio>
   </el-row>

   <el-row class="addBox" >
     <el-col :span="18">
       <el-input placeholder="Enter name" v-model="personAdded"></el-input>
     </el-col>
     <el-col :span="6">
       <el-button type="success" @click="addPerson">Add</el-button>
     </el-col>
   </el-row>

   <div class="bodyBox">
     <el-row v-for="person in handledPeopleData" :key="person" v-if="person.seen">
       <el-checkbox-group  @change="handleClickCheckbox(value)" v-model="checkedPerson">
         <el-col :span="20" class="checkbox">  
            <el-checkbox  :label="person.name"></el-checkbox>
         </el-col>
         <el-col :span="2">
            <el-button size="small" class="el-icon-delete" @click="deletePerson(person)">
            </el-button>
         </el-col>
       </el-checkbox-group>
    </el-row>
   </div>

   <el-row class="footer">
      <el-col :span="14">Chosen People: <i style="color:red">{{checkedPerson.length}}</i></el-col>
      <el-col :span="10">Fee: <i style="color:red">{{checkedPerson.length*30}} 000 VNĐ</i></el-col>
    </el-row>

</div>
</template>
<script>
export default {
  name: 'checkForm',

  data () {
    return {
      radio: 'Show All',
      personAdded: '',
      checkedPerson: [],
      people: [
        {name: 'Đặng Hữu Tú', seen: true},
        {name: 'Nguyễn Văn A', seen: true},
        {name: 'Phạm Nhật Duy', seen: true},
        {name: 'Nguyễn Văn B', seen: true},
        {name: 'Phạm Anh Tuấn', seen: true},
        {name: 'Nguyễn Văn C', seen: true},
        {name: 'Trịnh Hoàng Đức', seen: true}
      ],
      handlePeopleData: []
    }
  },

  methods: {
    addPerson () {
      if (this.personAdded === '') {
        alert('Error!')
      } else {
        this.people.push({
          name: this.personAdded,
          seen: true
        })
        this.personAdded = ''
      }
    },
    deletePerson (person) {
      let index1 = this.checkedPerson.indexOf(person.name)
      if (index1 > -1) {
        this.checkedPerson.splice(index1, 1)
      }
      let index = this.people.indexOf(person)
      this.people.splice(index, 1)
    },
    handleClickCheckbox (value) {
      console.log(value)
    }
  },

  computed: {
    handledPeopleData () {
      const newData = []
      if (this.radio === 'Show All') {
        return this.people
      } else if (this.radio === 'Show Eat') {
        for (const person of this.people) {
          if (this.checkedPerson.indexOf(person.name) !== -1) {
            newData.push(person)
          }
        }
        return newData
      } else {
        for (const person of this.people) {
          if (this.checkedPerson.indexOf(person.name) === -1) {
            newData.push(person)
          }
        }
        return newData
      }
    }
  }
}
</script>

<style scoped>
.root{
    border:1px solid black;
    width:400px;
    margin:auto;
}
.el-row{
  margin-top:20px;
}
.addBox{
  margin-left:20px;
  
}
.bodyBox{
   margin:20px;
   border:1px solid lightgrey;
   text-align: left;
   height: 250px;
   overflow-y:scroll;
}
.checkbox{
    margin-top:5px;
    margin-left:15px;
    float:left;
}
.footer{
  margin:20px; 
  text-align: left;
  font-weight:500;
}
</style>
