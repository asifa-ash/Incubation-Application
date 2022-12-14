import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Store from "../../../utils/userStore/ContextApi";

function app_update(id, status, context, index) {
  if (!index) {
    let result = context.app_data.map((el) => {
      return el._id === id ? { ...el, status: status } : { ...el };
    });
    context.setApplication(result);

    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/form-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: status, id: id }),
    });
  } else {
    console.log("from app", index);
    let result = context.app_data.map((el) => {
      return el._id === id ? { ...el, status: status, slot: index } : { ...el };
    });
    context.setApplication(result);

    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/form-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: status, id: id, index: index }),
    });
  }
}

function ApplicationList() {
  //using context api
  const app = useContext(Store);

  let nav = useNavigate();

  //updating application
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/adminhome`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        app.setApplication(result.app);
      });
  }, []);

  //new application list
  let element = app.app_data.map((el, index) =>
    el.status === "new" ? (
      <tr key={index}>
        <td>🔷</td>
        <td>{el._id}</td>
        <td>{el.cname}</td>
        <td>
          <button
            onClick={() => {
              nav(`/admin/read/${el._id}`);
            }}
            className="btn btn-primary btndelete"
          >
            Open
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              app_update(el._id, "pending", app);
            }}
            className="btn btn-success btndelete"
          >
            Pending
          </button>
        </td>
      </tr>
    ) : (
      ""
    )
  );
  //new pending list
  let penddingElement = app.app_data.map((el) =>
    el.status === "pending" || el.status === "approved" ? (
      <tr key={el._id}>
        <td>🔷</td>
        <td>{el._id}</td>
        <td>{el.cname}</td>
        <td>
          <button
            onClick={()=>nav(`/admin/read/${el._id}`)}
            className="btn btn-primary btndelete"
          >
            Open
          </button>
        </td>
        <td>
          <button
            className={`${
              el.status === "approved" ? "disabled" : ""
            } btn btn-success btndelete`}
            onClick={
              el.status === "approved"
                ? ""
                : () => {
                    app_update(el._id, "approved", app);
                  }
            }
          >
            {el.status === "approved" ? "Approved" : "Approve"}
          </button>
        </td>
        <td>
          <button
            className="btn btn-success btndelete"
            onClick={() => {
              app_update(el._id, "declined", app);
            }}
          >
            Decline
          </button>
        </td>
      </tr>
    ) : (
      ""
    )
  );
  return (
    <>
      <div className="left">
        <div className="box">
          <h2
            style={{
              color: "#02b6ff",
              fontSize: "2vw",
              fontFamily: "monospace",
            }}
          >
            New application list{" "}
          </h2>
          <div className="table-responsive ">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Application Id</th>
                  <th scope="col">Company Name</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{element}</tbody>
            </table>
          </div>
        </div>

        <div className="box">
          <h2
            style={{
              color: "#02b6ff",
              fontSize: "2vw",
              fontFamily: "monospace",
            }}
          >
            Pending application list
          </h2>

          <div className="table-responsive">
            <table className="table table-dark table-striped ">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Application Id</th>
                  <th scope="col">Company Name</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{penddingElement}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export { ApplicationList, app_update };
