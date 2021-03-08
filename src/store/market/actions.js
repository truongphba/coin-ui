// import { httpClient } from 'src/api/http'
// import { cleanFilter } from 'src/utils/utils'
import data from 'src/data/currencies'

// const endPoint = '/market'
// eslint-disable-next-line no-unused-vars
let connection = null

export async function loadMarket ({ commit }, params) {
  commit('fetchMarketBegin')
  const responseData = []
  if (params.exchanges === 'bitfinex') {
    if (params.currency === 'USDT') params.currency = 'USD'
    // eslint-disable-next-line no-const-assign
    if (connection != null) {
      connection.close()
    }
    connection = await new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    connection.onopen = (event) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].symbol !== params.currency) {
          const msg = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 't' + data[i].symbol + params.currency
          })
          connection.send(msg)
        }
      }
    }
    connection.onmessage = async (event) => {
      if (event) {
        const eventData = JSON.parse(event.data)
        if (!Array.isArray(eventData) && eventData.event === 'subscribed') {
          for (let i = 0; i < data.length; i++) {
            if (data[i].symbol + params.currency === eventData.pair) {
              data[i].chanId = eventData.chanId
              responseData.push(data[i])
            }
          }
        }
        console.log(eventData)
        if (Array.isArray(eventData) && eventData.length > 0) {
          for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].chanId === eventData[0] && eventData[1].length > 1) {
              responseData[i].last_price = eventData[1][6]
              responseData[i].daily_change = eventData[1][5]
              responseData[i].daily_high = eventData[1][8]
              responseData[i].daily_low = eventData[1][9]
              responseData[i].daily_volume = eventData[1][6] * eventData[1][7]
            }
          }
        }
        try {
          commit('fetchMarketBegin')
          commit('fetchMarketSuccess', {
            data: responseData
          })
        } catch (error) {
          commit('fetchMarketError', error.response)
          return null
        }
      }
    }
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
