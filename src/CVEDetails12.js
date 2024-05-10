// CVEDetails.js

import React, { useState, useEffect } from 'react';
import './CVEDetails.css';
import { useParams } from 'react-router-dom';


const CVEDetails = () => {
  const [cves, setCves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cveId } = useParams();
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId}`);
          const data = await response.json();
          setCves(data.vulnerabilities || []);
          console.log(data.vulnerabilities[0].cve.configurations)
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [cveId]);

  
  return (
    <div className="cve-containers">
    <h1>CVE DETAILS</h1>

  {isLoading && <p>Loading CVEs...</p>}
  {error && <p>Error fetching CVEs: {error.message}</p>}
  {!isLoading && cves.length > 0 && (
    <>
    <div>
      {cves.map((cve,index) => (
        <div key={index}>
          <h1>{cve.cve.id}</h1>
          <h2>Description:</h2>
          <p>{cve.cve.descriptions[0].value}</p>
          <h2>CVSS V2 Metrics:</h2>
          <h4>Severity: <span>{cve.cve.metrics?.cvssMetricV2?.[0]?.baseSeverity}</span></h4>
          <h4>Score: <span>{cve.cve.metrics?.cvssMetricV2?.[0]?.cvssData?.baseScore}</span></h4> 
          <h4>Vector String: <span>{cve.cve.metrics?.cvssMetricV2?.[0]?.cvssData?.vectorString}</span></h4>
          <table className='cve-table'>
              <thead>
                <tr>
                  <th>Access Vector</th>
                  <th>Access Complexity</th>
                  <th>Authentication</th>
                  <th>Confidentiality Impact</th>
                  <th>Integrity Impact</th>
                  <th>Availability Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{cve.cve.metrics?.cvssMetricV2[0]?.cvssData?.accessVector || ''}</td>
                  <td>{cve.cve.metrics?.cvssMetricV2[0]?.cvssData?.accessComplexity || ''}</td>
                  <td>{cve.cve.metrics?.cvssMetricV2[0]?.cvssData?.authentication || ''}</td>
                  <td>{cve.cve.metrics?.cvssMetricV2[0]?.cvssData?.confidentialityImpact || ''}</td>
                  <td>{cve.cve.metrics?.cvssMetricV2[0]?.cvssData?.integrityImpact || ''}</td>
                  <td>{cve.cve.metrics?.cvssMetricV2[0]?.cvssData?.availabilityImpact || ''}</td>
                </tr>
              </tbody>
            </table>
            <h4>Exploitability Score: <span>{cve.cve.metrics?.cvssMetricV2[0]?.exploitabilityScore || ''}</span></h4>
            <h4>Impact Score: <span>{cve.cve.metrics?.cvssMetricV2[0]?.impactScore || ''}</span></h4>
            <div className="configurations">
            <h3>CPE:</h3>
        <table className='cve-table'>
            <thead>
                <tr>
                    <th>Criteria</th>
                    <th>Match Criteria ID</th>
                    <th>Vulnerable</th>
                </tr>
            </thead>
            <tbody>
    {cve.cve.configurations.map((conf, confIndex) => (
        conf.nodes.map((node, nodeIndex) => (
            node.cpeMatch.map((cpeMatch, cpeIndex) => (
                <tr key={`${confIndex}-${nodeIndex}-${cpeIndex}`}>
                    <td>{cpeMatch.criteria}</td>
                    <td>{cpeMatch.matchCriteriaId}</td>
                    <td>{cpeMatch.vulnerable ? "Yes" : "No"}</td>
                </tr>
            ))
        ))
    ))}
</tbody>
</table>
          </div>
        {/*references */}
        <div className='references'>
          <h2>References:</h2>
          <table className='cve-table'>
            <thead>
              <th>URL</th>
              <th>SOURCE</th>
            </thead>
            <tbody>
            {cve.cve.references.map((reference, index) => (
        <tr key={index}>
          <td><a href={reference.url}>{reference.url}</a></td>
          <td>{reference.source}</td>
        </tr>
      ))}
            </tbody>
          </table>
        </div>

        </div>
      ))}
    </div>
  </>
  
      )}
      {!isLoading && cves.length === 0 && <p>No CVEs found.</p>}
    </div>
  );
};

export default CVEDetails;
