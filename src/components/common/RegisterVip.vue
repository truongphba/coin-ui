<template>
  <div>
    <div class="bg-indigo-9 q-pa-xl text-white relative-position">
      <h4>Be the first to know about Crypto News Daily</h4>
      <p style="margin-left: 0">Get crypto analytics, news and updates right from your inbox! Sign up here to not miss any newsletter.</p>
      <q-btn
        label="Register member"
        class="q-mt-md"
        color="indigo-14"
        @click="alertRegister = true"
        v-if="user.data"
      ></q-btn>
      <q-btn
        label="Register member"
        class="q-mt-md"
        color="indigo-14"
        :to="{name: 'login'}"
        v-else
      ></q-btn>
      <img class="img-register" src="/images/logo_coin.png">
    </div>
    <q-dialog v-model="alertRegister">
      <q-card class="bg-indigo" style="width: 800px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-white">Register Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <q-card class="my-card" @click="registerMember(3)">
                <q-card-section>
                  <p class="title text-amber-5">Gold Member</p>
                  <p class="price">15$/mo</p>
                  <p class="line bg-amber-5"></p>
                  <p class="content">
                    More news from experts <br>
                    Higher accuracy<br>
                    The optimal choice<br>
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card class="my-card" @click="registerMember(2)">
                <q-card-section>
                  <p class="title text-blue-grey-6">Silver Member</p>
                  <p class="price">10$/mo</p>
                  <p class="line bg-blue-grey-6"></p>
                  <p class="content">
                    See all the latest news <br>
                    most accurate news<br>
                    Instant continuous notification<br>
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card class="my-card" @click="registerMember(1)">
                <q-card-section>
                  <p class="title text-brown" >Bronze Member</p>
                  <p class="price">5$/mo</p>
                  <p class="line bg-brown"></p>
                  <p class="content">
                    Receive advice from an expert<br>
                    Support investment decision-making<br>
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="pay">
      <q-card class="bg-indigo">
        <q-card-section>
          <div class="text-h6 text-white">Register Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card">
            <q-card-section>
              <p class="title">You are registered {{ getMemberType }} Member</p>
              <p class="price">{{ getPrice }}$/mo</p>
              <p class="line bg-amber-5"></p>
              <p class="content">
                Your code is: <span style="font-weight: bold"> {{ subscribe ? subscribe.data.code : '' }}</span> <br>
                Please wait admin confirm your request<br>
              </p>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RegisterVip',
  data () {
    return {
      alertRegister: false,
      pay: false
    }
  },
  computed: {
    ...mapState('subscribe', [
      'subscribe',
      'isLoading',
      'error'
    ]),
    ...mapState('auth', [
      'user',
      'isLoading',
      'error'
    ]),
    getMemberType () {
      const type = this.subscribe ? this.subscribe.data.type : ''
      if (type === 1) {
        return 'Bronze'
      } else if (type === 2) {
        return 'Silver'
      } else if (type === 3) {
        return 'Gold'
      } else {
        return 'None'
      }
    },
    getPrice () {
      const type = this.subscribe ? this.subscribe.data.type : ''
      if (type === 1) {
        return '5'
      } else if (type === 2) {
        return '10'
      } else if (type === 3) {
        return '15'
      } else {
        return null
      }
    }
  },
  methods: {
    ...mapActions({
      saveSubscribe: 'subscribe/saveSubscribe',
      clearError: 'subscribe/clearError'
    }),
    async registerMember (type) {
      await this.saveSubscribe(type)
      if (this.subscribe) {
        this.alertRegister = false
        this.pay = true
      }
    }
  }
}
</script>

<style scoped>
.img-register{
  position: absolute;
  right: 100px;
  bottom: 20px;
  width: 250px;
  height: auto;
}
.item-img{
  height: 90px;
}
.my-card{
  margin: 5px;
  color: rgb(73, 86, 102);
  text-align: center;
  height: 200px;
  cursor: pointer;
}
.my-card:hover{
  background-color: bisque;
}
 p {
  margin: 0;
}
.title {
  font-size: 14pt;
  font-weight: bold;
  text-transform: uppercase;
}
.price{
  font-size: 16pt;
  font-weight: bold;
}
.line{
  margin: 10px 40%;
  height: 3px;
  border-radius: 25px;
}
.content{
  color: rgb(73, 86, 102);
}
</style>
