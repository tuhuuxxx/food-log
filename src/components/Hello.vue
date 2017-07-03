<template>
 <div id="app">
   <form @submit.prevent="search">
     <input v-model="username" placeholder="Enter here">
   </form>
    <p v-for="str of data" :key="str" @click="runMusic(str)">{{str}}</p>
     <audio controls v-if="act">
       <source :src="this.thisSong" type="audio/mpeg">
     </audio>
     <div v-else>Loading...</div>
   </div>
</template>

<script>

  export default {
    data () {
      return {
        username: '',
        data: [],
        dataFile: '',
        errorMsg: '',
        act: false
      }
    },

    computed: {
      thisSong () {
        return `https://files.freemusicarchive.org/` + this.dataFile
      }
    },

    methods: {
      search () {
        const goodboy = 10
        const author = this.username
        const api = `https://freemusicarchive.org/api/trackSearch?q=${author}&limit=${goodboy}`

        this.axios.get(api).then(response => {
          this.data = response.data.aRows
        }).catch(error => {
          this.errorMsg = 'No information!'
          console.log(error)
        })
      },
      runMusic (str) {
        var myStr = str.match(/[0-9]/g)
        myStr = myStr.join('')
        const getApi = `https://freemusicarchive.org/api/get/tracks.json?api_key=VAJH0E2CTQ7360YR&track_id=${myStr}`

        this.act = false
        this.axios.get(getApi).then(response => {
          this.dataFile = response.data.dataset[0].track_file
          this.act = true
        }).catch(error => {
          this.errorMsg = 'No information!'
          console.log(error)
        })
        console.log(this.dataFile)
      }
    }
  }
</script>
