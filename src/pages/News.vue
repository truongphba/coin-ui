<template>
  <q-page>
    <div class="q-py-md" style="padding-left: 100px; padding-right: 100px">
      <div class="row">
        <div class="col-8">
          <q-card class="list-news">
            <q-card-section clickable class="news" v-for="item in news" :key="item.id">
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
        <div class="col-4"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'News',
  computed: {
    ...mapState('news', [
      'news',
      'isLoading',
      'error'
    ]),
    ...mapState('auth', [
      'user'
    ])
  },
  mounted () {
    this.loadNews(this.user.data)
  },
  methods: {
    ...mapActions({
      loadNews: 'news/loadNews',
      clearError: 'news/clearError'
    })
  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.title {
  font-size: 14pt;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
.line{
  margin-top: 20px;
  background-color: #E5E5E5;
  height: 1px;
  width: 100%;
}
</style>
