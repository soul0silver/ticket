import { useLoaderData } from "react-router-dom";

import EventsPage from "./EventsPage";
import { useEffect, useState } from "react";
import CreateEvent from "./CreateEvent";
import { instance } from "../../../config/AxiosConfig";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const eventsData = useLoaderData();
  console.log(eventsData);
  const isSponsor = JSON.parse(localStorage.getItem("roles"))?.filter(
    (r) => r === "SPONSOR"
  ).length === 1;
  useEffect(() => {
    getData().then((res) => {
      let data = res.data.map((v) => {
        let value = {
          id: v.id,
          name: v.name,
          image: v.image,
          price: v.price,
          short_description: v.title,
          title: v.title,
          introduce: v.introduce
        };

        return value;
      });
      setEvents(data);
    });
  });
  const getData = async () => {
    try {
      return await instance.get("url");
    } catch (err) {
      return null;
    }
  };
  const data = eventsData.events;

  return (
    <div>
      {openAdd ? <CreateEvent setOpen={setOpenAdd} /> : null}
      {isSponsor && <div className="fixed top-[25px] right-[30px] z-[20]">
        <label
          onClick={() => setOpenAdd(true)}
          htmlFor="my_modal_6"
          className="btn bg-gradient-to-br text-white from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          + Add event
        </label>
      </div>}
      <div className="hero min-h-[25vh] bg-[#053B50]">
        <div className="hero-overlay  bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Events</h1>
            <p className="mb-5">Join our Events</p>
            <span>
              <progress className="progress progress-error w-32"></progress>
            </span>
          </div>
        </div>
      </div>
      <div>
        <EventsPage eData={data} />
      </div>
    </div>
  );
};

export default AllEvents;
