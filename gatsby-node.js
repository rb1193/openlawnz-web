exports.createPages = ({ actions: { createPage } }) => {
  const news = require("./data/news.json")

  createPage({
    path: `/news`,
    component: require.resolve("./src/templates/news.js"),
    context: {
      news: news.items,
    },
  })

  news.items.forEach(n => {
    createPage({
      path: `/news/${n.slug}`,
      component: require.resolve("./src/templates/single-news.js"),
      context: {
        title: n.title,
        formattedDate: n.formattedDate,
        content_html: n.content_html,
        image: n.image_url,
        image_alt: n.image_alt,
        summary: n.summary,
      },
    })
  })
}
