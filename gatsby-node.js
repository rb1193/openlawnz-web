const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `NewsJson`) {
    const slug = createFilePath({ node, getNode, basePath: `news` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `MicrositesJson`) {
    const slug = createFilePath({ node, getNode, basePath: `microsites` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    
  }
  if (node.internal.type === `OurMissionJson`) {
    const slug = createFilePath({ node, getNode, basePath: `our-mission` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    
  }

  if (node.internal.type === `GetInvolvedJson`) {
    const slug = createFilePath({ node, getNode, basePath: `get-involved` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    
  }
}

exports.createPages = async ({graphql, actions: { createPage } }) => {

  const result = await graphql(`
    query PagesQuery {
      allNewsJson {
        edges {
          node {
            fields {
              slug
            }
            date
            content_html
            title
            summary
            image_url
            image_alt
          }
        }
      }
      allMicrositesJson {
        edges {
          node {
            fields {
              slug
            }
            title
            description
            content {
              title
              modules {
                type
                title
                content {
                  content_html
                }
                wizard
              }
            }
            Terms {
              title
              description
            }
          }
        }
      }
      allWizardJson {
        nodes {
          title
          key
          background
          steps {
            key
            question
            options {
              label
              value
              next
              content
              tooltip
            }
          }
        }
      }
      allOurMissionJson {
        nodes {
          description
          title
          fields {
            slug
          }
          content {
            contributors {
              image_url
              title
            }
            directors {
              bio
              name
              image_url
            }
            group {
              content_html
              title
            }
            title
            type
          }
        }
      }
      allGetInvolvedJson {
        nodes {
          description
          title
          content {
            title
            type
            group {
              title
              content_html
            }
            contributors {
              title
              image_url
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const newsData = result.data.allNewsJson.edges // organises and sorts news items
    .map(n => n.node)
    .map(n => ({ ...n, slug: n.fields.slug }))
    .sort((a,b) => {
      return +new Date(b.date) - +new Date(a.date)
    })
  
  const micrositeData = result.data.allMicrositesJson.edges 
    .map(n => n.node)
    .map(n => ({ ...n, slug: n.fields.slug }))

  const ourMissionData = result.data.allOurMissionJson.nodes
    .map(n => ({ ...n, slug: n.fields.slug }))

  const getInvolvedData = result.data.allGetInvolvedJson.nodes
    .map(n => ({ ...n, slug: n.fields.slug }))

  const wizardData = result.data.allWizardJson.nodes

  createPage({
    path: `/news`,
    component: require.resolve("./src/templates/news.js"),
    context: {
      news: newsData,
    },
  })

  //generates static pages for each news article based on template
  newsData.forEach(n => {
    createPage({
      path: '/news' + n.slug,
      component: require.resolve("./src/templates/single-news.js"),
      context: n,
    })
  })

  //generates static pages for each section of a microsite
  micrositeData.forEach(n => {
    let title = n.title
    let keyTerms = n.Terms
    let section_headings = n.content.map(x => x.title)
    //console.log(section_headings)
    //console.log(n.content.map(x => x.title.replace(/\s/g, '-').toLowerCase()))
    n.content.forEach(section => {
      createPage( {
        path: '/get-empowered' + `${n.slug}${section.title.replace(/\s/g, '-').toLowerCase()}`,
        component: require.resolve("./src/templates/microsite.js"),
        context: {title, section, section_headings, keyTerms, wizardData},
      })
    })
  })

  ourMissionData.forEach(n => {
    createPage( {
      path: "/our-mission" + n.slug,
      component: require.resolve("./src/templates/our-mission-page.js"),
      context: n,
    })
  })

  getInvolvedData.forEach(n => {
    createPage( {
      path: "/get-involved" + n.slug,
      component: require.resolve("./src/templates/get-involved-page.js"),
      context: n,
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/case/)) {
    page.matchPath = "/case/*"

    createPage(page)
  }
}

