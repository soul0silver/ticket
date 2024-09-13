import { useLoaderData } from "react-router-dom";

import EventsPage from "./EventsPage";
import { useEffect, useState } from "react";
import CreateEvent from "./CreateEvent";
import AllEventsCard from "./AllEventsCard";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  let eventsData = [];
  const isSponsor =
    JSON.parse(localStorage.getItem("roles"))?.filter((r) => r === "SPONSOR")
      .length === 1;
  useEffect(() => {
    eventsData = [
      {
        id: 1,
        name: "Tech Square",
        image: "https://i.ibb.co/Lz7wpMs/Tech-Square-Card-1.png",
        price: 29.99,
        short_description:
          "Talk with product experts, experience innovations in Tech Square. Catch up on new updates from Samsung platforms and OS like SmartThings, Knox and Tizen, Mobile & Screen Experience, Home & Health Experience, Sustainability.",
      },
    ];
    getData().then((res) => {
      let data = res.data.map((v) => {
        let value = {
          id: v.id,
          name: v.name,
          image: v.image,
          price: v.price,
          short_description: v.title,
          title: v.title,
          introduce: v.introduce,
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
  const data = eventsData;

  return (
    <div>
      {openAdd ? <CreateEvent setOpen={setOpenAdd} /> : null}
      {isSponsor && (
        <div className="fixed top-[25px] right-[30px] z-[20]">
          <label
            onClick={() => setOpenAdd(true)}
            htmlFor="my_modal_6"
            className="btn bg-gradient-to-br text-white from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            + Add event
          </label>
        </div>
      )}

      <div>
        <div className="max-w-7xl mx-auto my-16">
          <div className="grid mx-4 md:mx-0 md:grid-cols-2 gap-5">
            {data.map((e) => (
              <AllEventsCard key={e.id} e={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
