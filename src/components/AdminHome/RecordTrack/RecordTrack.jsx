import React, { useContext } from "react";
import "./style.css";
import Store from "../../../utils/userStore/ContextApi";

function RecordTrack() {
  
  const app = useContext(Store);

  let table = app.app_data.map((el) => (
    <tr>
      <td>🔷</td>
      <td>{el._id}</td>
      <td>{el.cname}</td>
      <td>{el.status}</td>
      <td>
        <div
          data-progress={el.progress}
          className="w-25 usersProgress mx-3"
          style={{ "--progressAdmin": `${el.progress}%` }}
        ></div>
      </td>
    </tr>
  ));

  return (
    <div className="left">
      <div className="box" style={{ color: "red" }}>
        <h2
          style={{ color: "#02b6ff", fontSize: "2vw", fontFamily: "monospace" }}
        >
          Recode Track
        </h2>

        <div className="table-responsive ">
          <table className="table table-sm fs-6 table-dark table-striped ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Application Id</th>
                <th scope="col">Company Name</th>
                <th scope="col">Status</th>
                <th scope="col">Progress</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecordTrack;
