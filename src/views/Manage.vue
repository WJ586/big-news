<template>
  <div class="column">
    <n-header>栏目管理</n-header>
    <div class="bottom">
      <div class="del">
        <h5>点击删除以下频道</h5>
        <div class="columns">
          <div
            class="module"
            v-for="(item,index) in columnList"
            :key="item.id"
            @click="del(index)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="add">
        <h5>点击添加以下频道</h5>
        <div class="columns">
          <div
            class="module"
            v-for="(post,index) in addList"
            :key="post.id"
            @click="add(index)"
          >{{post.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnList: [],
      addList: []
    }
  },
  created() {
    this.getColumn()
  },
  methods: {
    async getColumn() {
      const columnList = JSON.parse(localStorage.getItem('columnList'))
      const addList = JSON.parse(localStorage.getItem('addList'))
      console.log(columnList, addList)
      if (columnList) {
        this.columnList = columnList
        this.addList = addList
        return
      }
      const res = await this.$axios.get('/category')

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.columnList = data
        // console.log(this.columnList)
      }
    },
    async del(index) {
      // console.log(this.columnList.length)
      if (this.columnList.length <= 4) {
        this.$toast('至少保留三个')
        return
      }
      this.addList.push(this.columnList[index])
      this.columnList.splice(index, 1)
      // console.log(index)

      // const res = await this.$axios.post('/category', {
      //   name: this.columnList[index].name
      // })
      // console.log(res)
      // const { statusCode, message } = res.data
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      //   // this.columnList = data
      //   // console.log(this.columnList)
      // }
    },
    async add(index) {
      this.columnList.push(this.addList[index])
      this.addList.splice(index, 1)
    }
  },
  watch: {
    columnList: {
      // 是否为深度监听，如果为true，会监听对象内部属性的变化，默认为false
      deep: true,
      // 当值发生了变化，这个函数会执行
      handler() {
        localStorage.setItem('columnList', JSON.stringify(this.columnList))
        localStorage.setItem('addList', JSON.stringify(this.addList))
      }
    }
  }
}
</script>
<style lang="less" scoped>
.column {
  width: 100%;
  padding: 10px 20px 0;
  .bottom {
    h5 {
      // font-weight: normal;
      color: #6e6f6f;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .columns {
      overflow: hidden;
      .module {
        float: left;
        margin: 5px 5px;
        width: 70px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        border: 1px solid #e4e4e4;
      }
    }
    .del {
      margin-bottom: 20px;
    }
  }
}
</style>
