import axios from "axios";
import { useEffect, useState } from "react";
import { instance } from "../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";

export default function CreateEvent({ setOpen, setOnAdd }) {
  const [pic, setPic] = useState();
  const [img, setImg] = useState();
  const [event, setEvent] = useState({
    tag:'',
    title:'',
    introduce:'',
    startDay:'',
    startTime:'',
    description:'',
    price:0,
    image:'',
    uid: null
  });
  useEffect(() => {
    return () => {
      pic && URL.revokeObjectURL(pic.preview);
    };
  }, [pic]);
  const preview = (inputFile) => {
    const file = inputFile.target.files[0];
    setImg(file);
    file.preview = URL.createObjectURL(file);
    setPic(file);
  };

  async function onUpload() {
    const data = new FormData();
    if (img) {
      data.append("image", img);
      try {
        const res = await axios.post("https://api.imgur.com/3/image/", data, {
          headers: {
            Authorization: "Client-ID 2739162cd7d6953",
            "Content-Type": "image/jpeg",
          },
        });
        return res.data.data.link;
      } catch (err) {
        // Handle Error Here
        console.error(err);
        return ''
      }
    }
    return ''
  }
  function createEvent(){
    onUpload().then(res=>{
      let uid = JSON.parse(localStorage.getItem('user'))?.id
      instance.post('/events/add', {...event, image:res, uid: uid}).then(re =>{
        setOnAdd(res.id)
        toast.success("Create successfully!")}
      )
    })
    setOpen()
  }
  return (
    <>
    <ToastContainer />
      <div
        className="fixed z-[21] w-full h-screen overflow-hidden flex items-center justify-center top-0 left-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.54)" }}
      >
        <div
          className="absolute z-[22] w-full h-full top-0 left-0"
          onClick={() => setOpen(false)}
        ></div>
        <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl relative z-50">
          <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
            <img src="data:image/png;base64,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" />
          </div>
          <div className="flex justify-between">
            <div className="p-2 md:p-20 md:pr-4 flex flex-col items-center gap-4">
              <img style={{ width: "300px" }} src={pic?.preview} alt="" />
              
              <label
                style={{
                  border: "1px solid",
                  padding: "4px 5px",
                  marginTop: "5px",
                }}
                htmlFor="file"
              >
                {pic ? "Change image" : "Add image"}
                <input
                  type="file"
                  name="image"
                  id="file"
                  onChange={preview}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <form
              className="p-6 md:p-20 w-8/12"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="text"
                  id="username"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Event's tag"
                  value={event.tag}
                  onChange={(e)=>setEvent({...event,tag:e.target.value})}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="text"
                  id="day"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Event's title"
                  value={event.title}
                  onChange={(e)=>setEvent({...event,title:e.target.value})}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="text"
                  id="intro"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Introduce"
                  value={event.introduce}
                  onChange={(e)=>setEvent({...event,introduce:e.target.value})}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="date"
                  id="date"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Start day"
                  value={event.startDay}
                  onChange={(e)=>setEvent({...event,startDay:e.target.value})}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="time"
                  id="time"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Start time"
                  value={event.startTime}
                  onChange={(e)=>setEvent({...event,startTime:e.target.value})}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <textarea
                  id="des"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full max-h-[100px]"
                  placeholder="Desciption"
                  value={event.description}
                  onChange={(e)=>setEvent({...event,description:e.target.value})}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="number"
                  id="password"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Price"
                  value={event.price}
                  onChange={(e)=>setEvent({...event,price:e.target.value})}
                />
              </div>
              <button
                onClick={createEvent}
                className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
