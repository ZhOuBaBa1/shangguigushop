<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="liveIndex" @mouseenter="enterShouw">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(C1, index) in categoryList"
                :key="C1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="C1.categoryName"
                    :data-category1Id="C1.categoryId"
                    >{{ C1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ C1.categoryName }}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(C2, index) in C1.categoryChild"
                    :key="C2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="C2.categoryName"
                          :data-category2Id="C2.categoryId"
                          >{{ C2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(C3, index) in C2.categoryChild"
                          :key="C3.categoryId"
                        >
                          <a
                            :data-categoryName="C3.categoryName"
                            :data-category3Id="C3.categoryId"
                            >{{ C3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div></transition
        >
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕：可以向服务器发请求
  mounted() {
    if (this.$route.path != '/home') {
      this.show = false;
    }
  },
  computed: {
    //通过mapState拿到数据
    //右侧需要的是一个函数，使用计算属性时，右侧函数执行一次
    //注入一个参数state。即为大仓库中的数据
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },
    //非正常情况。行为够快，可能会出现卡顿
    //防抖：前面所有的触发都被取消，最后一次执行在规定时间之后才会触发，也就是说如果连续快速触发，只会执行一次
    //节流：在规定的建个时间范围内不会重复的触发回调，只有大于这个时间间隔才会触发回调。
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    liveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != '/home') {
        this.show = false;
      }
    },
    goSearch(event) {
      //路由跳转最好的方式是，编程式导航+事件委派
      //1、时间委派，只有点击a标签才能进行路由跳转
      //2、如何区分1级2级3级的a标签
      let element = event.target;
      //节点有一个属性dataset属性，可获取节点的自定义属性和值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: 'search' };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //合并参数
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    enterShouw() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }

    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    // .sort-leave {
    //   height: 461px;
    // }
    // .sort-leave-to {
    //   height: 0px;
    // }
    // .sort-leave-active {
    //   transition: all 0.5s linear;
    // }
  }
}
</style>
