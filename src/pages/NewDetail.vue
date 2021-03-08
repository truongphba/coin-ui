<template>
  <q-page>
    <div class="q-py-md" style="padding-left: 100px; padding-right: 100px">
      <div class="row">
        <div class="col-8">
          <div class="new">
            <p class="new-title"> {{ newsDetail.title }} </p>
            <div class="content" v-html="newsDetail.content">
            </div>
            <div class="row">
              <div class="col">
                <p class="date">{{ newsDetail.created_at }}
                </p>
              </div>
              <div class="col">
                <p class="author"><b>Author:</b> Trường </p>
              </div>
            </div>
          </div>
<!--          <q-card class="list-news">-->
<!--            <q-card-section class="news">-->
<!--              <div class="row">-->
<!--                <div class="col-8">-->
<!--                  <p class="title">Quân đội Mỹ có thể từ chối bắn đại bác chia tay Trump</p>-->
<!--                  <p>Defense One, trang chuyên đưa tin về quốc phòng Mỹ, cuối tuần qua dẫn lời hai quan chức cấp cao cho-->
<!--                    biết Lầu Năm Góc chưa có kế hoạch tổ chức lễ chia tay với Tổng thống sắp mãn nhiệm Donald Trump.</p>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <q-img-->
<!--                    src="https://i1-vnexpress.vnecdn.net/2021/01/18/BBXu887-1610955683-6880-1610955723.jpg?w=220&h=132&q=100&dpr=2&fit=crop&s=2IrPkijwT3dZTWGDs7aNkg"-->
<!--                    style="height: 150px; width: 100%"-->
<!--                  />-->
<!--                </div>-->
<!--                <p class="line"></p>-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--            <q-card-section class="news">-->
<!--              <div class="row">-->
<!--                <div class="col-8">-->
<!--                  <p class="title">Quân đội Mỹ có thể từ chối bắn đại bác chia tay Trump</p>-->
<!--                  <p>Defense One, trang chuyên đưa tin về quốc phòng Mỹ, cuối tuần qua dẫn lời hai quan chức cấp cao cho-->
<!--                    biết Lầu Năm Góc chưa có kế hoạch tổ chức lễ chia tay với Tổng thống sắp mãn nhiệm Donald Trump.</p>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <q-img-->
<!--                    src="https://i1-vnexpress.vnecdn.net/2021/01/18/BBXu887-1610955683-6880-1610955723.jpg?w=220&h=132&q=100&dpr=2&fit=crop&s=2IrPkijwT3dZTWGDs7aNkg"-->
<!--                    style="height: 150px; width: 100%"-->
<!--                  />-->
<!--                </div>-->
<!--                <p class="line"></p>-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--            <q-card-section class="news">-->
<!--              <div class="row">-->
<!--                <div class="col-8">-->
<!--                  <p class="title">Quân đội Mỹ có thể từ chối bắn đại bác chia tay Trump</p>-->
<!--                  <p>Defense One, trang chuyên đưa tin về quốc phòng Mỹ, cuối tuần qua dẫn lời hai quan chức cấp cao cho-->
<!--                    biết Lầu Năm Góc chưa có kế hoạch tổ chức lễ chia tay với Tổng thống sắp mãn nhiệm Donald Trump.</p>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <q-img-->
<!--                    src="https://i1-vnexpress.vnecdn.net/2021/01/18/BBXu887-1610955683-6880-1610955723.jpg?w=220&h=132&q=100&dpr=2&fit=crop&s=2IrPkijwT3dZTWGDs7aNkg"-->
<!--                    style="height: 150px; width: 100%"-->
<!--                  />-->
<!--                </div>-->
<!--                <p class="line"></p>-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--            <q-card-section class="news">-->
<!--              <div class="row">-->
<!--                <div class="col-8">-->
<!--                  <p class="title">Quân đội Mỹ có thể từ chối bắn đại bác chia tay Trump</p>-->
<!--                  <p>Defense One, trang chuyên đưa tin về quốc phòng Mỹ, cuối tuần qua dẫn lời hai quan chức cấp cao cho-->
<!--                    biết Lầu Năm Góc chưa có kế hoạch tổ chức lễ chia tay với Tổng thống sắp mãn nhiệm Donald Trump.</p>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <q-img-->
<!--                    src="https://i1-vnexpress.vnecdn.net/2021/01/18/BBXu887-1610955683-6880-1610955723.jpg?w=220&h=132&q=100&dpr=2&fit=crop&s=2IrPkijwT3dZTWGDs7aNkg"-->
<!--                    style="height: 150px; width: 100%"-->
<!--                  />-->
<!--                </div>-->
<!--                <p class="line"></p>-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--            <q-card-section class="news">-->
<!--              <div class="row">-->
<!--                <div class="col-8">-->
<!--                  <p class="title">Quân đội Mỹ có thể từ chối bắn đại bác chia tay Trump</p>-->
<!--                  <p>Defense One, trang chuyên đưa tin về quốc phòng Mỹ, cuối tuần qua dẫn lời hai quan chức cấp cao cho-->
<!--                    biết Lầu Năm Góc chưa có kế hoạch tổ chức lễ chia tay với Tổng thống sắp mãn nhiệm Donald Trump.</p>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <q-img-->
<!--                    src="https://i1-vnexpress.vnecdn.net/2021/01/18/BBXu887-1610955683-6880-1610955723.jpg?w=220&h=132&q=100&dpr=2&fit=crop&s=2IrPkijwT3dZTWGDs7aNkg"-->
<!--                    style="height: 150px; width: 100%"-->
<!--                  />-->
<!--                </div>-->
<!--                <p class="line"></p>-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--          </q-card>-->
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NewDetail',
  data () {
    return {
      newsDetail: {}
    }
  },
  computed: {
    ...mapState('news', [
      'news',
      'isLoading',
      'error'
    ])
  },
  async mounted () {
    await this.loadNews()
    this.loadNewsDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      loadNews: 'news/loadNews',
      clearError: 'news/clearError'
    }),
    loadNewsDetail (id) {
      this.newsDetail = this.news.find(element => element.id === parseInt(id))
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.new-title {
  font-size: 28pt;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  line-height: 40px;
  margin-bottom: 20px;
}

.content {
  font-size: 15pt;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
}

.content >>> img {
  width: 100%!important;
  margin: 20px 0;
}
.author{
  text-align: right;
  font-size: 14pt;
  color: rgb(73, 86, 102);
}
.date{
  font-size: 14pt;
  color: rgb(73, 86, 102);
}
.line{
  margin-top: 20px;
  background-color: #E5E5E5;
  height: 1px;
  width: 100%;
}
.title {
  font-size: 14pt;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
.list-news{
  margin-top: 20px;
}
</style>
