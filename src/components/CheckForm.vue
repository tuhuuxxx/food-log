<template>
<div class="root">
  <el-row>
    <el-date-picker  class="dateTime" v-model="dateValue" type="date" placeholder="Pick a day" @change="handleDatePicker(dateValue)">
    </el-date-picker>
  </el-row>

  <div class="filter-controls">
    <el-radio  v-model="radio" label="Show All">Show All</el-radio>
    <el-radio  v-model="radio" label="Show Eat">Show Eat</el-radio>
    <el-radio  v-model="radio" label="Show Not Eat">Show Not Eat</el-radio>
  </div>

  <div class="bodyBox">
    <el-row v-for="person of handledPeopleData" :key="person.id" >
      <el-col :span="16" class="checkbox">  
        <el-checkbox :value="inCheckedPeople(person)" @change="handleClickCheckbox(person)" :label="person.name" ></el-checkbox>
      </el-col>
      <el-col :span="2">
        <el-button size="small" class="el-icon-edit" @click="showDetail(person)">
        </el-button>
      </el-col>
      <el-col :span="2" :offset="2" >
        <el-button size="small" class="el-icon-delete" @click="deletePerson(person)">
        </el-button>
      </el-col>
  </el-row>
  </div>

  <div class="footer">
    <div :span="14">Chosen People: <i style="font-size: 20px; color: red">{{checkedPerson.length}}</i></div>
    <div :span="10">Fee: <i style="font-size: 20px; color: red">{{ checkedPerson.length * 30 * 1000 | currency }} VNĐ</i></div>
  </div>

  <el-row>
    <el-form>
    <el-button  @click="submitForm" type="primary" style="float:right; margin-right:20px; margin-bottom:20px;">
      Submit
    </el-button>
    </el-form>
  </el-row>
  
  <el-dialog size="large" :visible.sync="detailVisible">
    <div><b>User: </b>{{ selectedPerson.name }} </div>
    <p class="total-text">Total : <b>{{ (payment * 1000) | currency }} VND</b></p>
    <el-table :height="300" :data="detailTable" style="margin-top:20px; width: 100%"> 
      <el-table-column prop="date" label="Date" width="" header-align="center">
      </el-table-column>
      <el-table-column prop="price" label="Price" header-align="center">
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>
<script>
import api from '@/api'

export default {
  name: 'checkForm',

  data () {
    return {
      dateValue: new Date(),
      radio: 'Show All',
      checkedPerson: [],
      checkedDate: [],
      detailVisible: false,
      people: [],
      selectedPerson: {},
      detailTable: [],
      payment: 0
    }
  },

  methods: {
    /*
    addPerson () {
      if (!this.personAdded) {
        alert('Error!')
      } else {
        this.people.push({
          name: this.personAdded,
          seen: true
        })
        this.personAdded = ''
      }
    },
    */
    deletePerson (person) { // xoa person.name trong checkedPerson, xoa person trong people
      let indexOfCheckedPerson = this.checkedPerson.indexOf(person)
      if (indexOfCheckedPerson > -1) {
        this.checkedPerson.splice(indexOfCheckedPerson, 1)
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
          let indexOfPersonChange = this.checkedPerson.indexOf(person)
          this.checkedPerson.splice(indexOfPersonChange, 1)
        }
      }
    },
    handleDatePicker (dateValue) {
      this.checkedDate.push({
        date: this.dateValue,
        people: this.checkedPerson
      })
      this.checkedPerson = []
    },
    showDetail (person) {
      api.request('get', `/api/foodlog/${person.id}`)
        .then(res => {
          this.detailTable = res.data.data
          this.payment = this.detailTable.reduce((total, data) => total + data.price, 0)
        })
        .catch(err => {
          console.log(err)
        })

      this.selectedPerson = person
      this.detailVisible = true
    },
    submitForm () {
      api.request('post', '/api/foodlog', {
        users: this.checkedPerson,
        date: this.dateValue
      })
        .then(res => {
          this.$notify({
            title: 'Success',
            message: res.data.message,
            type: 'success'
          })
        })
        .catch(error => {
          console.log(error)
        })
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
          if (this.checkedPerson.indexOf(person) !== -1) {
            newData.push(person)
          }
        }
        return newData
      } else {
        for (const person of this.people) {
          if (this.checkedPerson.indexOf(person) === -1) {
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

    api.request('get', '/api/users')
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
    border:1px solid rgba(0, 0, 0, 0.3);
    width: 60%;
    margin: 0 auto 20px;
    background: white;
    border-radius: 10px;
}

@media (max-width: 768px) {
  .root{
    width: auto;
    margin: 0 10px 20px;
  }
} 

.el-row{
  margin-top:20px;
}
.addBox{
  margin-left:20px;
}
.bodyBox {
   margin:20px;
   border:1px solid rgba(0, 0, 0, 0.3);
   text-align: left;
   overflow-y: scroll;
   height: 200px;
   border-radius: 10px;
}
.checkbox{
    margin-top:5px;
    margin-left:15px;
    float:left;
}

.footer {
  margin:20px; 
  display: flex;
  justify-content: space-between;  
}

.dateTime{
  float:left;
  margin:20px;
}

.total-text {
  color: red;
}

.total-text b {
  font-size: 20px;
}

.filter-controls {
  display: flex;
  justify-content: space-around;
}
</style>
