<template>
<div>
    <el-col :span="12">
        <div>list suggestion</div>
        <el-autocomplete :fetch-suggestions="querySearch" placeholder="Please Input" @select="handleSelect" v-model="state">
        </el-autocomplete>
    </el-col>
    <el-col :span="12">
        <el-autocomplete :fetch-suggestions="querySearch" :select="handleSelect" v-model="state2" :trigger-on-focus="false" icon="edit" custom-item="my-item-en">
        </el-autocomplete>
    </el-col>
    <hr>
    <el-select style="margin-top:50px" v-model="value" multiple >
        <el-option v-for="item in options" :key="item" :label="item.label" :value="item.value" :disabled="item.disabled">
            {{item.value}}
        </el-option>
    </el-select>
</div>
</template>

<script>
export default {
  name: 'demoInput',

  data () {
    return {
      links: [],
      state: '',
      state2: '',
      options: [
        {value: 'Option1', label: 'Option1'},
        {value: 'Option2', label: 'Option2'},
        {value: 'Option3', label: 'Option3', disabled: true},
        {value: 'Option4', label: 'Option4'}
      ],
      value: ''
    }
  },

  methods: {
    querySearch (queryString, cb) {
      var links = this.links
      var results = queryString ? links.filter(this.createFilter(queryString)) : links
      cb(results)
      console.log(cb)
    },
    createFilter (queryString) {
      return (link) => {
        return (link.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        {value: 'vue', link: 'https://github.com/vuejs/vue'},
        {value: 'element', link: 'https://github.com/ElemeFE/element'},
        {value: 'cooking', link: 'https://github.com/ElemeFE/cooking'},
        {value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui'},
        {value: 'vuex', link: 'https://github.com/vuejs/vuex'},
        {value: 'vue-rooter', link: 'https://github.com/vuejs/vue-router'},
        {value: 'babel', link: 'https://github.com/babel/babel'}
      ]
    },
    handleSelect (item) {
      console.log(item)
    }
  },

  mounted () {
    this.links = this.loadAll()
  }
}
</script>
