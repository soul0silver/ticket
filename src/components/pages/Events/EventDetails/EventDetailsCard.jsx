import PropTypes from "prop-types";

import Payment from "../../payment/Payment";
import { useEffect, useState } from "react";
import { instance } from "../../../../config/AxiosConfig";
import axios from "axios";

const EventDetailsCard = ({ id }) => {
  const [event, setEvent] = useState({
    name: "",
    image: "",
    price: 0,
    short_description: "",
    start_date: "",
    start_time: "",
    introduce: "",
    tag: "",
  });
  const [openAdd, setOpen] = useState(false);
  useEffect(() => {
    getEvent(id).then((res) => {
      let data = res.data;
      setEvent({
        ...event,
        name: data.title,
        image: data.image,
        price: data.price,
        short_description: data.title,
        start_date: data.startDay,
        start_time: data.startTime,
        introduce: data.introduce,
        description: data.description,
        tag: data.tag,
      });
    });
  }, []);
  async function getEvent(id) {
    return instance.get(`/events/${id}`);
  }
  if (!event) {
    return <div>Loading...</div>;
  }
  const [order, setOrder] = useState(0);
  function setPayment(e) {
    let user = JSON.parse(localStorage.getItem("user"));
    instance
      .post("/tickets", {
        eid: id,
        name: event.name,
        email: user.email,
        quantity: order,
      })
      .then((res) => {
        console.log(res);
        window.open("http://localhost:8080/pay/" + res.data.id, '_blank', 'noopener,noreferrer') ;
      });
  }
  return (
    <div className="max-w-screen-xl md:mx-auto mx-2 ">
      <h2 className="text-4xl font-semibold text-center text-rose-500 p-5">
        {event?.name}
      </h2>

      <div className="card my-5 mb-8 lg:card-side bg-opacity-40  shadow-xl">
        <figure>
          <img
            data-aos="zoom-in"
            className=" md:h-[650px] object-cover"
            src={event?.image}
            alt="Album"
          />
        </figure>
        <div className="card-body md:w-[650px] mx-auto">
          <h2 className="card-title text-2xl font-extrabold text-rose-400">
            {event?.price}$
          </h2>
          <progress className="progress progress-error w-56"></progress>
          <p data-aos="flip-right" className="text-justify">
            {event?.introduce}
          </p>
          <p data-aos="flip-right" className="text-justify">
            {event?.description}
          </p>
          <div className="flex">
            <p className="text-xl font-medium">
              Start at {event?.start_date}  {event?.start_time} <br />
            </p>
          </div>

          <div className="card-actions items-center justify-start flex">
            {!openAdd && <label
              onClick={() => setOpen(true)}
              htmlFor="my_modal_6"
              className="btn bg-gradient-to-br text-white from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              Get Ticket
            </label>}
            {openAdd && <label
              onClick={() => setPayment()}
              htmlFor="my_modal_6"
              className="btn bg-gradient-to-br text-white from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              Check out
            </label>}
            {openAdd && <input
                type="number"
                placeholder="Quantity"
                className="border border-gray-300 px-3 h-[46px] bg-white rounded-lg"
                onInput={(e) => {
                  console.log(e);
                  
                  setOrder(e.target.value);
                }}
              />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;

EventDetailsCard.propTypes = {
  event: PropTypes.object,
};
