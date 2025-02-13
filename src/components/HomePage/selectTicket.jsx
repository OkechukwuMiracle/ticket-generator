import Header from "../Navbar/header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const selectTicket = () => {
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = useState({
    type: "",
    quantity: 1,
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("ticketDetails"));
    if (savedData) setSelectedTicket(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketDetails", JSON.stringify(selectedTicket));
  }, [selectedTicket]);

  const handleTicketSelect = (type) => {
    setSelectedTicket({ ...selectedTicket, type });
  };

  return (
    <div className="">
      <Header />
      <div className="selection_container max-w-screen-sm  mt-7 p-7 m-auto border-2 rounded-3xl">
        <div className="step_container md:flex justify-between items-center w-full pb-3 relative">
          <h1 className="h1_line text-white text-2xl">Ticket Selection</h1>
          <p className="p_line text-gray-300 text-lg">step 1 / 3</p>
          <span className="absolute w-10/12 md:w-1/3"></span>
        </div>

        <div className="fest_container border-2 p-4 rounded-2xl mt-5">
          <div className="ticket_container max-w-screen-sm p-5 m-auto border-2 rounded-3xl">
            <h1 className="techember_h1 text-4xl md:text-6xl text-white text-center  ">
              Techember Fest "25
            </h1>
            <p className="text-gray-300 text-md font-semi-bold text-center m-auto md:w-3/5">
              Join us for an unforgetable experience at [Event Name]! secure
              your spot now.{" "}
            </p>
            <p className="text-gray-300 text-md font-semi-bold text-center mt-2">
              [Event Location] || March 15,2025 | 7:00pm{" "}
            </p>
          </div>

          {/* Ticket Type Selection */}
          <div className="mt-5">
            <h3 className="text-gray-300 font-semi-bold">
              Select Ticket Type:
            </h3>
            <div className="access_container max-w-screen-sm mt-7 p-5 m-auto border-2 rounded-3xl md:flex justify-around gap-2">
              {[
                { type: "Free", price: "Free", access: "REGULAR ACCESS" },
                { type: "VIP", price: "$150", access: "VIP ACCESS" },
                { type: "VVIP", price: "$300", access: "VVIP ACCESS" },
              ].map(({ type, price, access }) => (
                <button
                  key={type}
                  className={`access px-4 py-3 border-2 rounded-xl cursor-pointer w-full mt-3 ${
                    selectedTicket.type === type ? "border" : ""
                  }`}
                  onClick={() => handleTicketSelect(type)}
                >
                  <h5 className="font-bold text-white text-xl pb-2 text-start">
                    {price}
                  </h5>
                  <p className="text-gray-300 text-sm text-start">{access}</p>
                  <p className="text-gray-300 text-sm text-start">20/52</p>
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Quantity */}
          <div className="mt-5">
            <label className="text-gray-300">Number of Tickets:</label>
            <select
              className="w-full mt-3 p-3 border-2 rounded-xl text-white bg-inherit outline-none"
              value={selectedTicket.quantity}
              onChange={(e) =>
                setSelectedTicket({
                  ...selectedTicket,
                  quantity: e.target.value,
                })
              }
            >
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="btn_2 flex justify-between gap-5 mt-5">
            <button className="btn_1 md:w-1/2 border-2 p-3 text-xl rounded-xl">
              Cancel
            </button>
            <button
              onClick={() => navigate("/attendeeDetails")}
              className="btn_1 md:w-1/2 border-2 p-3 text-xl rounded-xl"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default selectTicket;
