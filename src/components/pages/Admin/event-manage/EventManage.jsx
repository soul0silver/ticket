import { useEffect, useState } from "react";
import EditEvent from "./EditEvent";
import { instance } from "../../../../config/AxiosConfig";
import { toast } from "react-toastify";

export default function EventManage() {
  const [data, setData] = useState([]);
  const [edit,setEdit] = useState();
  useEffect(() => {
    if (edit === undefined || edit === null)
    instance
      .get("/events/list")
      .then((res) => {
        let data = res.data.map((v) => {
          let value = {
            id: v.id,
            name: v.name,
            image: v.image,
            price: v.price,
            description: v.desciption,
            title: v.title,
            introduce: v.introduce,
          };

          return value;
        });
        setData(data);
      })
      .catch((err) => setData([]));
  }, [edit]);

  function deleteEvent(id){
    instance.delete(`events/${id}`).then(res=>{
      toast.success("Delete successfully!");
      instance
      .get("/events/list")
      .then((res) => {
        let data = res.data.map((v) => {
          let value = {
            id: v.id,
            name: v.name,
            image: v.image,
            price: v.price,
            description: v.desciption,
            title: v.title,
            introduce: v.introduce,
          };

          return value;
        });
        setData(data);
      })
      .catch((err) => setData([]));
    }).catch(err=>{
      toast.error("Delete failed!")
    })
  }
  return (
    <>
    {edit && <EditEvent id={edit} setOpen={setEdit} />}
      <div className="flex py-8 flex-col space-y-6 min-h-[600px] lg:pl-[20px] pl-[20px] pr-[10px]">
        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <div className="p-3">
            <div className="flex justify-between select-none">
              <div className="flex flex-col justify-center items-center p-3 cursor-pointer">
                <p>All events</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                  <tr>
                    <th className="p-2 min-w-[100px] text-left">Title</th>
                    <th className="p-2 min-w-[100px] text-left">image</th>
                    <th className="p-2 min-w-[100px] text-left">Price</th>
                    <th className="p-2 min-w-[100px] text-left">Tag</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data?.map((v, i) => (
                    <tr key={i}>
                      <td className="p-2 min-w-[100px] text-left">{v.title}</td>
                      <td className="p-2 min-w-[100px] text-left">
                        <img width={200} src={v.image} alt="" />
                      </td>
                      <td className="p-2 min-w-[100px] text-left">{v.price}</td>
                      <td className="p-2 min-w-[100px] text-left">{v.tag}</td>
                      <td className="p-2 min-w-[100px] text-right">
                        <button onClick={()=>setEdit(v.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                          </svg>
                        </button>
                        <br />
                        <button onClick={()=>deleteEvent(v.id)}>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2VQStEURiGXxazZGNY+wMspmj4C0QRf4Ioil8wRhFFsZcdsSAWsmBNFvwD146xmK2ubj1quilzvu/cjeatr27fOc/7vZ1z6kodhaskqS4pkZRSb/SytcK10TI4X9la4XplWLWlV6WXnUrh+mJYd67/cwpulSRtcq9ppEq4nrbeSD3i4HzV2gmQsHlM8TQe8kbSWHdp9U0Lrj91X+Dwu5AjewKqyK4KHplXsM6BZxwBZvE4s8C7wCuOAKt47FjgZeA9R4B9PJYs8DTwhSPAJR5TFngY+NkR4AWPIQvcA9yU1GUM0MSj18jrA4N+AzsA+y6HHjEZMbCjsA+eAKeYzBnYedgTT4BtTNYM7DrslifAIiYHBvYQdsETYBKTKwN7DTvhCTCISYPvEK4BG8L9qlvH7/dGEVSWdCzpM2BwtvdIUl+MAB39b30D/xjM01Az2toAAAAASUVORK5CYII=" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
