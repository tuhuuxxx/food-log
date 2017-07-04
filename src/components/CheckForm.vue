<template>
<div class="root">
   <el-row>
    <el-date-picker class="dateTime" v-model="dateValue" type="date" placeholder="Pick a day" @change="handleDatePicker(dateValue)">
    </el-date-picker>
   </el-row>
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
     <el-row v-for="person of handledPeopleData" :key="person.id">
        <el-col :span="16" class="checkbox">  
          <el-checkbox :value="inCheckedPeople(person)" @change="handleClickCheckbox(person)" :label="person.name"></el-checkbox>
        </el-col>
        <el-col :span="2">
          <el-button size="small" class="el-icon-edit" @click="showDetail(person)">
          </el-button>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button size="small" class="el-icon-delete" @click="deletePerson(person)">
          </el-button>
        </el-col>
    </el-row>
   </div>

   <el-row class="footer">
      <el-col :span="14">Chosen People: <i style="color:red">{{checkedPerson.length}}</i></el-col>
      <el-col :span="10">Fee: <i style="color:red">{{checkedPerson.length*30}} 000 VNĐ</i></el-col>
    </el-row>
   <el-row>
     <el-form @submit.prevent="submitForm">
      <el-button type="primary" style="float:right; margin-right:20px; margin-bottom:20px;">
        Submit
      </el-button>
     </el-form>
   </el-row>
  
  <el-dialog :visible.sync="detailVisible" title="Show Detail">
    {{selectedPerson.name}} - {{selectedPerson.info}}
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'checkForm',

  data () {
    return {
      dateValue: new Date(),
      radio: 'Show All',
      personAdded: '',
      checkedPerson: [],
      checkedDate: [],
      detailVisible: false,
      people: [],
      selectedPerson: {}
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
    deletePerson (person) { // xoa person.name trong checkedPerson, xoa person trong people
      let indexOfName = this.checkedPerson.indexOf(person.name)
      if (indexOfName > -1) {
        this.checkedPerson.splice(indexOfName, 1)
      }
      let indexOfPerson = this.people.indexOf(person)
      this.people.splice(indexOfPerson, 1)
    },
    handleClickCheckbox (person) {
      if (!this.dateValue) {  // Neu chua chon ngay thi khong nhan duoc checkbox
        alert('Please choose a day!')
      } else {
        if (this.checkedPerson.indexOf(person) === -1) {
          this.checkedPerson.push(person)
        } else {
          let indexOfDate = this.checkedPerson.indexOf(person)
          this.checkedPerson.splice(indexOfDate, 1)
        }
      }
    },
    handleDatePicker (dateValue) {
      if (this.checkedDate.indexOf(dateValue) === -1) {
        this.checkedDate.push(dateValue)
      } else {
        alert('Ban da chon ngay nay mot lan roi!')
      }
      this.checkedPerson = []
    },
    showDetail (person) {
      this.selectedPerson = person
      this.detailVisible = true
    },
    submitForm () {
      // const api = 'http://skymapdevglobal.vn'
    },
    inCheckedPeople (person) {
      return this.checkedPerson.indexOf(person) >= 0
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
  },

  created () {
    const token = window.localStorage.getItem('token')

    if (!token) return

    this.axios({
      url: '/api/users',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        const users = res.data.data
        this.people = users
      })
      .catch(error => {
        console.log(error)
      })
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
.dateTime{
  float:left;
  margin:20px;
}
</style>
