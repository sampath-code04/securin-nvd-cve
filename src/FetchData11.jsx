import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FetchData.css';

const FetchData1 = () => {
  const [cves, setCves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=${limit}&startIndex=${(page - 1) * limit}`);
        const data = await response.json();
        setCves(data.vulnerabilities || []);
        const totalResults = data.totalResults || 0;
        setTotalRecords(totalResults);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);


  // const detailHandler = (cveId) => {
  //   window.location = `/cves/${cveId}`;
  // };
  const handlePageClick = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1); // Reset page to 1 when changing the limit
  };

  return (
    <div className="cve-containers">
        <h1>CVE LIST</h1>
        <h2>Total Records:{totalRecords}</h2>

      {isLoading && <p>Loading CVEs...</p>}
      {error && <p>Error fetching CVEs: {error.message}</p>}
      {!isLoading && cves.length > 0 && (
        <>
          <table className="cve-table">
            <thead>
              <tr>
                <th>CVE ID</th>
                <th>IDENTIFIER</th>
                <th>PUBLISHED DATE</th>
                <th>LAST MODIFIED DATE</th>
                <th>STATUS</th>
                <th>CVSS SCORE</th> {/* Add an empty header for future actions (optional) onClick={() => detailHandler(cve.cve.id)}*/}
              </tr>
            </thead>
            <tbody>
              {cves.map((cve,index) => (
                <tr key={cve.cve.id}>
                <td><Link to={`/cves/${cve.cve.id}`}>{cve.cve.id}</Link></td>
                 {/* <td>{cve.cve.id}</td> */}
                <td>{cve.cve.sourceIdentifier}</td>
                <td>{cve.cve.published.slice(0, 10)}</td> {/* Extract date only */}
                <td>{cve.cve.lastModified.slice(0, 10)}</td>
                <td>{cve.cve.vulnStatus}</td>
                <td>{cve.cve.metrics?.cvssMetricV2?.[0]?.cvssData?.baseScore}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          
          <div className="pagination">
          <div>
            <p id="record-count">{(page - 1) * limit + 1} - {Math.min(page * limit, totalRecords)} of {totalRecords} records</p>
          </div>
            <button disabled={page === 1} onClick={() => handlePageClick(page - 1)}>◄</button>
            <button className="page-btn active">{page}</button>
            {Array.from({ length: Math.min(Math.ceil(totalRecords / limit) - page, 5) }, (_, i) => (
              <button key={page + i + 1} className="page-btn" onClick={() => handlePageClick(page + i + 1)}>{page + i + 1}</button>
            ))}
            <button disabled={page * limit >= totalRecords} onClick={() => handlePageClick(page + 1)}>►</button>
          </div>
            {/*results per page */}
            <div className="results-per-page">
        <label htmlFor="resultsPerPage">Results per page:</label>
        <select id="resultsPerPage" onChange={handleLimitChange} value={limit}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
          
        </>
      )}
      {!isLoading && cves.length === 0 && <p>No CVEs found.</p>}
    </div>
  );
};

export default FetchData1;
