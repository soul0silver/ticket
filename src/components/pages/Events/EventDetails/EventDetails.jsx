import { useParams } from "react-router-dom";
import { useContext } from "react";
import EventDetailsCard from "./EventDetailsCard";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import EventView from "../../../EventView/EventView";

const EventDetails = () => {
  const { loading } = useContext(AuthContext);

  const { id } = useParams();
  const idInt = parseInt(id);

  return (
    <div>
      <EventDetailsCard id={idInt} />
      <div className="h-screen">
        <EventView />
      </div>
      {/* <ThreeJs /> */}
    </div>
  );
};

export default EventDetails;
