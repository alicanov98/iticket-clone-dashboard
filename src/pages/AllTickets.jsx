import axios from "axios";
import { useState, useEffect } from "react";

// Icons
import { FaTrash, FaEdit } from "react-icons/fa";

// Router
import { Link } from "react-router-dom";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, []);

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

  const deleteTicket = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_DELETE_EVENT}/${id}`)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
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
                    <FaTrash onClick={() => deleteTicket(item.id)} />
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
