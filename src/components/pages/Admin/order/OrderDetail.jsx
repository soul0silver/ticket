import { useEffect, useState } from "react";

export default function OrderDetail({ id, close, order }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    // getDetail(id).then((res) => setData(res.data));
  }, [id]);
  return (
    <>
      <div
        className="fixed w-full h-full flex flex-col items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="bg-white px-4 py-2 rounded-lg">
          <div className="h-full overflow-auto">
            <div className="w-full text-center">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                    <tr>
                      <th className="p-2 min-w-[100px] text-left">Create at</th>
                      <th className="p-2 min-w-[100px] text-left">Username</th>
                      <th className="p-2 min-w-[100px] text-left">Amount</th>
                      <th className="p-2 min-w-[100px] text-left">Number of courses</th>
                      <th className="p-2 min-w-[100px] text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className="p-2 min-w-[100px] text-left">{new Date(order.create_at).toLocaleString()}</td>
                      <td className="p-2 min-w-[100px] text-left">{order.username}</td>
                      <td className="p-2 min-w-[100px] text-left">{order.price}</td>
                      <td className="p-2 min-w-[100px] text-left">{data?.length}</td>
                      <td
                        className="p-2 min-w-[100px] text-left"
                        style={{ color: order.status == 1 ? "green" : "red" }}
                      >
                        {order.status == 1 ? "success" : "deny"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <ul className="flex flex-col pt-4 space-y-2">
              {data?.map((v, i) => (
                <li key={i} style={{ borderBottom: i !== data.length - 1 && "0.4px solid grey" }}>
                  <div className="flex">
                    <div className="py-1 pr-2">
                      <img style={{ width: "120px", border: "0.2px solid" }} src={v?.image} alt={""} />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-base font-bold text-black block capitalize text-ellipsis overflow-hidden whitespace-nowrap">
                        {v?.title}
                      </p>
                      <div className="flex w-full justify-between">
                        <div className="text-right">
                          <span className="font-bold text-green-300">{v.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full text-center py-7">
          <button className="px-[18px] py-[10px] rounded-[100%] bg-[rgba(0,0,0,0.6)]" onClick={() => close()}>
            <i className="fa-solid fa-xmark text-[rgba(225,225,225,0.5)]"></i>
          </button>
        </div>
      </div>
    </>
  );
}
