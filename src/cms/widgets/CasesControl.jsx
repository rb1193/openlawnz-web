import React from "react"
import AsyncSelect from "react-select/async"
import { reactSelectStyles } from "netlify-cms-ui-default"
import { debounce } from "lodash"
import PropTypes from "prop-types"
import { List } from "immutable"

export default class CasesControl extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string.isRequired,
    value: PropTypes.node,
    fetchID: PropTypes.string,
    classNameWrapper: PropTypes.string.isRequired,
    setActiveStyle: PropTypes.func.isRequired,
    setInactiveStyle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { noOptionsMessage: () => <span>No cases found</span> }
  }

  loadOptions = debounce((input, callback) => {
    fetch(`${process.env.GATSBY_SEARCH_API_URL}/cases?search=${input}&start=0&end=10`)
      .then((response) => response.json())
      .then(({ results }) => {
        callback(results.map(this.getSelectValue))
      })
      .catch(() => {
        this.setState({ noOptionsMessage: () => <span>Cases service unavailable, try again later</span> })
        callback([])
      })
  }, 500)

  handleChange = (selectedOptions) => {
    this.props.onChange(List(selectedOptions.map(({ caseData }) => caseData)))
  }

  getSelectValue = ({ caseId, citation, caseName, date }) => {
    return {
      value: caseId,
      label: `${citation} - ${caseName}`,
      caseData: {
        caseId: caseId,
        citation: citation,
        caseName: caseName,
        date: date,
      },
    }
  }

  render() {
    const { value, forID, classNameWrapper, setActiveStyle, setInactiveStyle } = this.props
    return (
      <AsyncSelect
        value={value && value.toJS().map(this.getSelectValue)}
        inputId={forID}
        defaultOptions
        loadOptions={this.loadOptions}
        onChange={this.handleChange}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
        styles={reactSelectStyles}
        isMulti={true}
        isClearable={true}
        placeholder=""
        noOptionsMessage={this.state.noOptionsMessage}
      />
    )
  }
}
