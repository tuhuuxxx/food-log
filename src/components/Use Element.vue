<template>
<div>
    <el-checkbox label="check all" v-model="checkall">

    </el-checkbox>
    <el-checkbox-group>
        <el-checkbox v-for="city in cities" :key="city"></el-checkbox>
    </el-checkbox-group>
</div>
</template>

<script>
export default {
    name: 'useElement',
    data () {
        return {
            checkall: true,
            cities: ['Hai Phong','Ha Noi','Da Nang','Can Tho'],
        }
    }
}
</script>