import { useLoaderData } from "react-router-dom";

import EventsPage from "./EventsPage";
import { useEffect, useState } from "react";
import CreateEvent from "./CreateEvent";
import { instance } from "../../../config/AxiosConfig";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [onAdd,setOnAdd]=useState(0);
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
          title: v.title,
          description: v.description,
          introduce: v.introduce,

        };

        return value;
      });
      setEvents(data);
    });
  },[]);
  const getData = async () => {
    try {
      return await instance.get("/events/list");
    } catch (err) {
      return null;
    }
  };

  return (
    <div>
      {openAdd ? <CreateEvent setOpen={setOpenAdd} setOnAdd={setOnAdd}/> : null}
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
        <EventsPage eData={events} />
      </div>
    </div>
  );
};

export default AllEvents;
