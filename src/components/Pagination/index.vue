<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.startNum > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.startNum > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.endNum"
      :key="index"
      v-if="page >= startNumAndEndNum.startNum"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.endNum < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.endNum < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['continues', 'pageNo', 'pageSize', 'total'],
  computed: {
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出分页器连续页码的起始数字和结束数字
    startNumAndEndNum() {
      const { continues, totalPage, pageNo } = this;
      let startNum = 0,
        endNum = 0;

      //非正常显示：总页数不够连续页码
      if (continues > totalPage) {
        startNum = 1;
        endNum = totalPage;
      } else {
        startNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
      }
      if (startNum < 1) {
        startNum = 1;
        endNum = continues;
      }
      if (endNum > totalPage) {
        startNum = totalPage - continues + 1;
        endNum = totalPage;
      }

      return { startNum, endNum };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
