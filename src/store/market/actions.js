import { httpClient } from 'src/api/http'
// import data from 'src/data/currencies'

const endPoint = '/Currencies'
// eslint-disable-next-line no-unused-vars
let connection = null

export async function loadMarket ({ commit }, params) {
  commit('fetchMarketBegin')
  const responseData = []
  const response = await httpClient.get(`${endPoint}`)
  const data = response.filter(element => element.symbol !== params.currency)
  if (connection != null) {
    connection.close()
  }
  if (params.exchanges === 'bitfinex') {
    // eslint-disable-next-line no-const-assign
    connection = await new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    if (params.currency === 'USDT') params.currency = 'USD'
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
  } else if (params.exchanges === 'binances') {
    connection = await new WebSocket('wss://stream.binance.com:9443/ws')
    connection.onopen = (event) => {
      for (let i = 0; i < 5; i++) {
        if (data[i].symbol !== params.currency) {
          const msg = JSON.stringify({
            method: 'SUBSCRIBE',
            params:
                [
                  data[i].symbol.toLowerCase() + params.currency.toLowerCase() + '@miniTicker'
                ],
            id: 1
          })
          connection.send(msg)
        }
      }
      connection.onmessage = async (event) => {
        if (event) {
          const eventData = JSON.parse(event.data)
          if (eventData.result === undefined) {
            for (let i = 0; i < 5; i++) {
              if ((data[i].symbol + params.currency) === eventData.s) {
                responseData[i] = data[i]
                responseData[i].last_price = parseFloat(eventData.c)
                responseData[i].daily_change = (eventData.c - eventData.o) / eventData.o
                responseData[i].daily_high = parseFloat(eventData.h)
                responseData[i].daily_low = parseFloat(eventData.l)
                responseData[i].daily_volume = eventData.v * eventData.c
              }
            }
          }
          const result = responseData.filter(element => element !== null)
          try {
            commit('fetchMarketBegin')
            commit('fetchMarketSuccess', {
              data: result
            })
          } catch (error) {
            commit('fetchMarketError', error.response)
            return null
          }
        }
      }
    }
  }
}

export async function loadSideMarket ({ commit }, params) {
  commit('fetchSideBegin')
  const responseData = []
  const response = await httpClient.get(`${endPoint}`)
  const data = response.filter(element => element.symbol !== params.currency)
  if (params.exchanges === 'bitfinex') {
    // eslint-disable-next-line no-const-assign
    connection = await new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    if (params.currency === 'USDT') params.currency = 'USD'
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
          commit('fetchSideBegin')
          commit('fetchSideSuccess', {
            data: responseData
          })
        } catch (error) {
          commit('fetchSideError', error.response)
          return null
        }
      }
    }
  } else if (params.exchanges === 'binances') {
    const sideConnection = await new WebSocket('wss://stream.binance.com:9443/ws')
    sideConnection.onopen = (event) => {
      for (let i = 0; i < 5; i++) {
        if (data[i].symbol !== params.currency) {
          const msg = JSON.stringify({
            method: 'SUBSCRIBE',
            params:
                [
                  data[i].symbol.toLowerCase() + params.currency.toLowerCase() + '@miniTicker'
                ],
            id: 1
          })
          sideConnection.send(msg)
        }
      }
      sideConnection.onmessage = async (event) => {
        if (event) {
          const eventData = JSON.parse(event.data)
          if (eventData.result === undefined) {
            for (let i = 0; i < 5; i++) {
              if ((data[i].symbol + params.currency) === eventData.s) {
                responseData[i] = data[i]
                responseData[i].last_price = parseFloat(eventData.c)
                responseData[i].daily_change = (eventData.c - eventData.o) / eventData.o
                responseData[i].daily_high = parseFloat(eventData.h)
                responseData[i].daily_low = parseFloat(eventData.l)
                responseData[i].daily_volume = eventData.v * eventData.c
              }
            }
          }
          const result = responseData.filter(element => element !== null)
          try {
            commit('fetchSideBegin')
            commit('fetchSideSuccess', {
              data: result
            })
          } catch (error) {
            commit('fetchSideError', error.response)
            return null
          }
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
