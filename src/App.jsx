import { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import Table from "./Table";
import { CSVLink } from "react-csv";

function App() {
  const csvLink = useRef();
  const SelectCSV = useRef();
  const pro = useRef();
  const [parsedData, setParsedData] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // ready === parsedData.length && pro.current.style.display = "none"
  }, [ready]);
  //State to store the values

  const changeHandler = async (event) => {
    pro.current.style.display = "block";
    pro.current.style.textAlign = "center";
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setReady(results.data.length);
        results.data.map((d) => {
          fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
              d.city +
              "&appid=657e4e554d24718c8ee24df8f0e96982&units=metric"
          )
            .then((data) => {
              return data.json();
            })
            .then((data) => {
              const tempObj = {};
              tempObj.name = data.name;
              tempObj.temp = data.main.temp;
              tempObj.description = data.weather[0].description;
              setParsedData((pre) => [...pre, tempObj]);
            });
        });
      },
    });
  };

  return (
    <div>
      <h1
        style={{ textAlign: "center", marginTop: "3vw" }}
        className="alert alert-success"
      >
        Welcome to Moishi's app
      </h1>
      <div
        style={{ textAlign: "center", marginTop: "2vw" }}
        onClick={() => {
          SelectCSV.current.click();
        }}
      >
        <button type="button" className="btn btn-outline-success">
          Select a CSV file
        </button>
      </div>
      <input
        ref={SelectCSV}
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "none" }}
      />
      <br />
      <br />
      {ready === parsedData.length ? (
        <Table parsedData={parsedData} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <progress style={{ display: "none" }} ref={pro}></progress>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "2vw" }}>
        <button
          className="btn btn-info"
          onClick={() => {
            csvLink.current.link.click();
          }}
        >
          Download transactions to csv
        </button>
        <CSVLink
          data={parsedData}
          filename="transactions.csv"
          className="hidden"
          ref={csvLink}
          target="_blank"
        />
      </div>
    </div>
  );
}

export default App;
