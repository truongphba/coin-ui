exports.cleanFilter = (obj) => {
  for (const attr in obj) {
    if (obj[attr] === null || obj[attr] === undefined) {
      delete obj[attr]
    }
  }
}
