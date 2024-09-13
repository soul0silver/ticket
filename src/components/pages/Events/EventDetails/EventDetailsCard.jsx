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
  useEffect(() => {
    getEvent(id).then((res) => {
      let data = res.data;
      setEvent({
        ...event,
        name: data.name,
        image: data.image,
        price: data.price,
        short_description: data.title,
        start_date: data.start_day,
        start_time: data.start_time,
        introduce: data.introduce,
        tag: data.tag,
      });
    });
  });
  async function getEvent(id) {
    return instance.get(`url?id=${id}`);
  }
  if (!event) {
    return <div>Loading...</div>;
  }

  async function sentOrder() {
    let data = {
      price: event.price,
      currency: "dollar", // tiền tệ
      method: "",
      intent: "", // ý định
      description: "",
    };
    return await axios.get("http://localhost:8080",data);
  }

  function setPayment() {
    location.href = "http://localhost:8080"
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
            {event?.short_description}
          </p>
          <div className="flex">
            <p className="text-xl font-medium">
              {new Date(event?.start_date).getDate()} <br /> {event?.start_time}{" "}
              <br />
            </p>
          </div>

          <div className="card-actions items-center justify-between ">
            <label
              onClick={() => setPayment()}
              htmlFor="my_modal_6"
              className="btn bg-gradient-to-br text-white from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              Get Ticket
            </label>
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
