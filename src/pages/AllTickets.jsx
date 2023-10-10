import { useState, useEffect } from "react";

//? Axios
import axios from "axios";

//? React Icons
import { FaTrash, FaEdit } from "react-icons/fa";

//? Router
import { Link } from "react-router-dom";

//? Sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AllTickets = () => {
  //? Local states
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, []);

  //? Get all tickets from api
  const getAllTickets = async () => {
    await axios
      .get(process.env.REACT_APP_ALL_EVENTS)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //? Delete tickets from api
  const deleteTicket = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${item.eventTitle} event ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.REACT_APP_DELETE_EVENT}/${item.id}`)
          .then((res) => {
            setTickets(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire(
          "Successfully !",
          `${item.eventTitle} event already deleted from database !`,
          "success"
        );
      }
    });
  };

  return (
    <section className="allTickets">
      <div className="container">
        <div className="row">
          <h2 className="title">All Tickets List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Ticket Image</th>
                <th>Ticket Name</th>
                <th>Ticket Date</th>
                <th>Ticket Price</th>
                <th>Edit Ticket</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="carImg">
                    <img
                      src={`http://localhost:7000/${item.cardImg}`}
                      alt="ticketImg"
                    />
                  </td>
                  <td>{item.eventTitle}</td>
                  <td>{item.eventDates}</td>
                  <td>{item.minimumPrice} ₼</td>
                  <td className="edit">
                    <Link to={`/edit-ticket/${item.id}`}>
                      <FaEdit />
                    </Link>
                    <FaTrash onClick={() => deleteTicket(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllTickets;
