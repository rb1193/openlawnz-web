exports.createPages = ({ actions: { createPage } }) => {
  const news = require("./data/news.json")
  news.items.forEach(n => {
    createPage({
      path: `/news/${n.slug}`,
      component: require.resolve("./src/templates/news-graphql.js"),
      context: {
        title: n.title,
        formattedDate: n.formattedDate,
        content_html: n.content_html,
        image: n.image_url,
      },
    })
  })
}
