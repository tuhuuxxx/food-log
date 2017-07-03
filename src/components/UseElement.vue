<template>
<div>
    <hr>
    <el-checkbox v-model="checkall" @change="handleClickAllChange" :indeterminate="isDeterminate">Check all
    </el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCityChange">
        <el-checkbox v-for="city in cities"  :label="city" :key="city">
            {{city}}
        </el-checkbox>
    </el-checkbox-group>
    <hr>
    <el-checkbox-group v-model="checkboxButton">
        <el-checkbox-button :disabled="city==='Hai Phong'" v-for="city in cities" :key="city" :label="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
    <hr>
    <el-input placeholder="Enter here"v-model="int"  icon="search" style="width:30%" :on-icon-click="handleClick" type="textarea" :autosize="{minRows: 2, maxRows: 3}"></el-input>
    <p>You entered {{int}}</p>
    <hr>
    <el-input placeholder="Please Enter" style="width:40%">
        <template slot="prepend">https://</template>
    </el-input>
    <el-input placeholder="Please input" v-model="input5" style="margin-top:15px;width:70%">
        <el-select style="width:150px;"v-model="select" slot="prepend" placeholder="Select">
            <el-option label="Restaurant" value="a"></el-option>
            <el-option label="Order No." value="b"></el-option>
            <el-option label="Tel" value="c"></el-option>
        </el-select>
         <el-button slot="append" icon="search"></el-button>
    </el-input>
    <hr style="margin:40px;">
    <el-row class="demo-autoComplete">
        <el-col :span="12">
            <div class="sub-title">List suggestion</div>
            <el-autocomplete  style="margin-top:15px"class="inline-input" placeholder="Please Input" @select="handleSelect" v-mode="state1" :fetch-suggestions="querySearch">
            </el-autocomplete>
        </el-col>
    </el-row>
 </div>
</template>

<script>
export default {
  name: 'useElement',

  data () {
    return {
      cities: ['Hai Phong', 'Ha Noi', 'Can Tho', 'Da Nang'],
      checkall: true,
      checkedCities: ['Hai Phong', 'Can Tho'],
      isDeterminate: true,
      checkboxButton: ['Hai Phong', 'Da Nang'],
      int: '',
      select: '',
      input5: '',
      state1: ''
    }
  },

  methods: {
    handleClickAllChange (event) {
      this.checkedCities = event.target.checked ? this.cities : []
      this.isDeterminate = false
    },
    handleCheckedCityChange (value) {
      let checkOut = value.length
      this.checkall = (checkOut === this.cities.length)
      this.isDeterminate = checkOut > 0 && checkOut < this.cities.length
      console.log(value)
    },
    handleClick (event) {
      console.log(event)
    },
    handleSelect (item) {
      console.log(item)
    },
    createFilter (queryString) {
      return (link) => {
        return (link.value.indexOf(queryString.toLowerCase() === 0))
      }
    },
    querySearch (queryString, cb) {
      var links = this.links
      var results = queryString ? links.filter(this.createFilter(queryString)) : links
      console.log(results)
    },
    loadAll () {
      return [
        {value: 'vue', link: 'google.com'},
        {value: 'element', link: 'google.com'},
        {value: 'cooking', link: 'google.com'},
        {value: 'vue-router', link: 'google.com'},
        {value: 'vuex', link: 'google.com'},
        {value: 'babel', link: 'google.com'}
      ]
    }
  }
}
</script>
