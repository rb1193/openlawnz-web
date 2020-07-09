import React from "react"
import parseISO from "date-fns/parseISO"
import dateFormat from "date-fns/format"

export default function CaseList({ id, cases }) {
  return (
    <section className="case-list">
      <table className="case-list-table">
        <thead>
          <tr className="case-list-table-row">
            <th className="case-list-table-heading" scope="col">Case Name</th>
            <th className="case-list-table-heading" scope="col">Citation</th>
            <th className="case-list-table-heading" scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(({ caseId, caseName, citation, date }, index) => (
            <tr key={`${id}_case_${index}`} className="case-list-table-row">
              <td className="case-list-table-cell">
                <a className="case-list-case-link" rel="item" href={`/case/${caseId}`}>
                  {caseName}
                </a>
              </td>
              <td className="case-list-table-cell">{citation}</td>
              <td className="case-list-table-cell">{dateFormat(parseISO(date), "dd/MM/yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
