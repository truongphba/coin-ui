<template>
  <q-page>
    <div class="q-py-md" style="padding-left: 100px; padding-right: 100px" v-if="Object.keys(newsDetail).length > 0">
      <div class="row">
        <div class="col-9">
          <div class="new">
            <p class="new-title"> {{ newsDetail.title }} </p>
            <div class="content" v-html="newsDetail.content">
            </div>
            <div class="row">
              <div class="col">
                <p class="date">{{ convertDate }}
                </p>
              </div>
              <div class="col">
                <p class="author"><b>Author:</b> Trường </p>
              </div>
            </div>
          </div>
          <q-card class="list-news" v-if="listNews">
            <q-card-section clickable class="news" v-for="item in listNews" :key="item.id">
              <div class="row">
                <div class="col-8">
                  <router-link style="cursor: pointer" tag="p" class="title" class-active="active" :to="'/news/' + item.id" exact>{{ item.title }}</router-link>
                  <p> {{ item.description}} </p>
                </div>
                <div class="col-4">
                  <q-img
                    :src="item.thumbnail"
                    style="height: 150px; width: 100%"
                  />
                </div>
                <p class="line"></p>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <app-side></app-side>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Side from 'src/components/market/Side'

export default {
  name: 'NewDetail',
  components: {
    appSide: Side
  },
  data () {
    return {
      newsDetail: {},
      listNews: []
    }
  },
  watch: {
    async '$route' (to, from) {
      await this.loadNews(this.user.data)
      await this.loadNewsDetail(this.$route.params.id)
      this.listNews = this.news.filter(element => element.id !== this.newsDetail.id)
    }
  },
  computed: {
    ...mapState('news', [
      'news',
      'isLoading',
      'error'
    ]),
    ...mapState('auth', [
      'user'
    ]),
    convertDate () {
      let datetime = this.newsDetail.createdAt
      datetime = datetime.substring(0, datetime.indexOf('T'))
      return datetime
    }
  },
  async mounted () {
    await this.loadNews(this.user.data)
    await this.loadNewsDetail(this.$route.params.id)
    this.listNews = this.news.filter(element => element.id !== this.newsDetail.id)
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
