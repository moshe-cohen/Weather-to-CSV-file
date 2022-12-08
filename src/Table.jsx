import React from "react";

const Table = ({ parsedData }) => {
  return (
    <div className="myTable">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">City name</th>
            <th scope="col">Temp</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {parsedData.map((item, index) => {
            return (
              <tr key={index.toString()}>
                <td>{item.name}</td>
                <td>{item.temp}</td>
                <td>{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
