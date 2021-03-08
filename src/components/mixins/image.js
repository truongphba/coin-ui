export default {
  methods: {
    getDefaultImageUrl () {
      return '/images/default.jpg'
    },
    getImageUrl (size, src) {
      if (size === 'original') {
        return `${process.env.SOURCE_URL}/uploads/images/${src}`
      }
      return `${process.env.SOURCE_URL}/images/${size}/${src}`
    }
  }
}
