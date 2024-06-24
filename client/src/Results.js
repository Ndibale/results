import React, { useState, useEffect } from 'react';

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function scrapeResults() {
      try {
        const response = await fetch('http://localhost:3005/api/data', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Origin': '*'
                  },
                  mode: 'cors'
                });
        const html = await response.text();
        console.log("Students results are", html)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const rows = doc.querySelectorAll('table tr');
        const scrapedResults = [];

        for (const row of rows) {
          const columns = row.querySelectorAll('td');

          if (columns.length === 5) {
            const student = {
              candidateNumber: columns[0].textContent.trim().substring(4),
              name: columns[1].textContent.trim().substring(4),
              division: columns[2].textContent.trim().substring(4),
              points: columns[3].textContent.trim().substring(4),
              grade: columns[4].textContent.trim().substring(4)
            };

            scrapedResults.push(student);
          }
        }

        setResults(scrapedResults);
      } catch (error) {
        console.error('Error scraping results:', error);
      }
    }

    scrapeResults();
  }, []);

  return (
    <div>
      <h1>Students Results</h1>
      <table>
        <thead>
          <tr>
            <th className="table_data">Candidate Number</th>
            <th className="table_data">Sex</th>
            <th className="table_data">Division</th>
            <th className="table_data">Points</th>
            <th className="table_data">Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((student, index) => (
            <tr key={index}>
              <td className="table_data">{student.candidateNumber.toString()}</td>
              <td className="table_data">{student.name.toString()}</td>
              <td className="table_data">{student.division.toString()}</td>
              <td className="table_data">{student.points.toString()}</td>
              <td className="table_data">{student.grade.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
