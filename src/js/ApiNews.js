export function getNews() {
  return new Promise((resolve, reject) => {
    import("../../data/news.json")
      .then(data => {
        resolve(data)
      })
      .catch(e => reject(e))
  })
}
