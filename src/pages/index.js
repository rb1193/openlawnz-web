import React from "react"
import Layout from "../components/layout"
import SearchContainer from "../components/SearchContainer.jsx"
import Mission from "../components/Mission.jsx"
import InfoCard from "../components/InfoCard.jsx"
import InfoCardUnit from "../components/InfoCardUnit.jsx"
import ContactUs from "../components/ContactUs.jsx"
import NewsSpotlight from "../components/NewsSpotlight"

const HomePage = (props, { history }) => (
  <Layout>
    <div className="highlighted-content">
      <h1 className="header-title">
        OpenLaw NZ is a new, free legal research platform for New Zealand.
      </h1>

      <SearchContainer history={history} />
      <InfoCard>
        <InfoCardUnit one="30,141" two="CASES" />
        <div className="border"></div>
        <InfoCardUnit one="25,208" two="CASE-TO-CASE RELATIONSHIPS" />
        <div className="border"></div>
        <InfoCardUnit one="346,395" two="CASE-TO-LEGISLATION RELATIONSHIPS" />
      </InfoCard>
    </div>
    <div className="home-wrapper">
      <Mission />
      <NewsSpotlight data={props.data.dataJson.items} />
      <ContactUs />
    </div>
  </Layout>
)

export const newsQuery = graphql`
  {
    dataJson {
      items {
        title
        summary
        slug
        image_url
        image_alt
      }
    }
  }
`

export default HomePage
