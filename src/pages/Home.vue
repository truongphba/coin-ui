<template>
  <div>
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      height="300px"
    >
      <q-carousel-slide class="slide-img" :name="1" img-src="/images/banner_coin.jpg"/>
      <q-carousel-slide class="slide-img" :name="2" img-src="/images/banner_coin_2.jpg"/>
    </q-carousel>
    <div class="information">
      <h4 class="text-center">500koin website synthesizing digital currency exchanges</h4>
      <p class="text-center" style="font-size: 13pt; color: #495666;">Provides safe and reliable digital asset trading and management
        services for millions of users in more than 130 countries.</p>
      <div class="info-detail">
        <div class="row">
          <div class="col text-center">
            <div class="item-img">
              <img src="/images/icon-home-1.svg">
            </div>
            <p class="item-title">The largest exchanges in the world</p>
            <p class="item-sub-content">Global mobility</p>
          </div>
          <div class="col text-center">
            <div class="item-img">
            <img src="/images/icon-home-2.svg">
            </div>
            <p class="item-title">Experts have many years of experience</p>
            <p class="item-sub-content">Years of experience in digital asset financial services, providing convincing accurate information</p>
          </div>
          <div class="col text-center">
            <div class="item-img">
            <img src="/images/icon-home-3.svg">
            </div>
            <p class="item-title">Track constant volatility</p>
            <p class="item-sub-content">Update exchange rate fluctuations at all times</p>
          </div>
        </div>
      </div>
    </div>
    <app-register-vip></app-register-vip>
  </div>
</template>

<script>
import RegisterVip from 'src/components/common/RegisterVip'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { appRegisterVip: RegisterVip },
  data () {
    return {
      slide: 1
    }
  }
}
</script>

<style scoped>
.slide-img {
  width: 100%;
  height: 100%;
}

h4 {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}
p{
  margin: 5px;
}
.information {
  padding: 50px 200px;
}

.info-detail {
  margin-top: 50px;
}
.item-title {
  font-size: 14pt;
}
.item-sub-content{
  color: #495666;
}
</style>
