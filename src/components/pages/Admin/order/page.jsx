import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import OrderDetail from "./OrderDetail";
import Pagination from "./Pagination";
import { instance } from "../../../../config/AxiosConfig";

export default function OrderManager() {
  const [data, setData] = useState();
  const [detail, setDe] = useState();
  const [fil, setFil] = useState({
    page: 0,
    first: new Date(
      new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1) +
        "-01T00:00",
    ).toISOString(),
    last: new Date().toISOString(),
    staus: 0,
  });

  const setfilter = (i) => {
    setFil({ ...fil, page: i });
  };
  const [summ, setSumm] = useState();
  const [year, setYear] = useState(new Date().getFullYear());

  const getTimeInGMTPlus7 = (date) => {
    // Calculate the time difference for GMT+7 (in milliseconds)
    const timeDifference = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

    // Get the current time in milliseconds
    const timeInMilliseconds = date.getTime();

    // Calculate the time in GMT+7
    const timeInGMTPlus7 = new Date(timeInMilliseconds + timeDifference);

    // Format the time as required for datetime-local input
    const formattedTime = timeInGMTPlus7.toISOString().slice(0, 16);

    return formattedTime;
  };

  async function getSummary(year) {
    return await instance.post('url');
  }
  let myChart = null;
  useEffect(() => {
    getSummary(year).then((res) => {
      if (res.status === 200) {
        setSumm(res.data);
        let config = {
          type: "bar",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: new Date().getFullYear(),
                backgroundColor: "#4a5568",
                borderColor: "#4a5568",
                data: res.data.chart.map((v) => {
                  return v.receive;
                }),
                fill: false,
                barThickness: 8,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Orders Chart",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            legend: {
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                  },
                  gridLines: {
                    borderDash: [1],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(33, 37, 41, 0.3)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                  },
                  gridLines: {
                    borderDash: [2],
                    drawBorder: false,
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.2)",
                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };

        let ctx = document.getElementById("bar-chart").getContext("2d");
        if (myChart != null) {
          myChart.destroy();
        }
        myChart = new ChartJS(ctx, config);
      }
    });
  }, [year]);
  return (
    <>
      {detail && <OrderDetail id={detail} close={setDe} order={data.list?.filter((v, i) => v.id === detail)[0]} />}
      <div className="flex py-8 flex-col space-y-6 items-center justify-center min-h-[600px] lg:pl-[20px] pl-[20px] pr-[10px]">
        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-300">
            <h2 className="font-semibold text-gray-800">Summary info</h2>
          </header>
          <div className="p-3">
            <div className="flex justify-between select-none">
              <div className="flex flex-col justify-center items-center p-3 cursor-pointer">
                <p>All orders</p>
                <p
                  className="text-xl text-sky-700"
                  onClick={() => setFil({ ...fil, staus: 0, first: new Date().getFullYear() + "-01-01T00:00" })}
                >
                  {summ?.totalOrder}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center p-3 cursor-pointer">
                <p>Success orders</p>
                <p className="text-xl text-green-400" onClick={() => setFil({ ...fil, staus: 1, first: new Date().getFullYear() + "-01-01T00:00" })}>
                  {summ?.success}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center p-3 cursor-pointer">
                <p>Fail orders</p>
                <p className="text-xl text-red-700" onClick={() => setFil({ ...fil, staus: 2, first: new Date().getFullYear() + "-01-01T00:00" })}>
                  {summ?.fail}
                </p>
              </div>
            </div>
            <div className="flex lg:flex-row justify-between">
              <div className="p-2 w-[60%] h-[300px] mb-3">
                <canvas id="bar-chart" />
              </div>
              <div className="p-2">
                <table className="table-auto w-full border">
                  <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                    <tr className="">
                      <th className="px-2 py-1 ">Course name</th>
                      <th className="px-2 py-1 ">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summ?.rankings?.map((v, i) => (
                      <tr key={i}>
                        <td className="px-2 py-1 ">{v.title}</td>
                        <td className="px-2 py-1 ">{v.ranks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-300 flex-row flex justify-between">
            <h2 className="font-semibold text-gray-800">Order list</h2>

            <div className="flex space-x-4">
              <div className="flex space-x-2">
                <label className="font-bold text-gray-800" htmlFor="">
                  from:
                </label>
                <input
                  type="datetime-local"
                  name=""
                  id=""
                  value={getTimeInGMTPlus7(new Date(fil.first))}
                  onChange={(e) => setFil({ ...fil, first: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <label className="font-bold text-gray-800" htmlFor="">
                  to:
                </label>
                <input
                  type="datetime-local"
                  name=""
                  id=""
                  value={getTimeInGMTPlus7(new Date(fil.last))}
                  onChange={(e) => setFil({ ...fil, last: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <label className="font-bold text-gray-800" htmlFor="">
                  status:
                </label>
                <select name="" id="" value={fil.staus}>
                  <option value={0}>All</option>
                  <option value={1}>Success</option>
                  <option value={2}>fail</option>
                </select>
              </div>
            </div>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                  <tr>
                    <th className="p-2 min-w-[100px] text-left">Create at</th>
                    <th className="p-2 min-w-[100px] text-left">Username</th>
                    <th className="p-2 min-w-[100px] text-left">Amount</th>
                    <th className="p-2 min-w-[100px] text-left">Status</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data?.list.map((v, i) => (
                    <tr key={i}>
                      <td className="p-2 min-w-[100px] text-left">{new Date(v.create_at).toLocaleString()}</td>
                      <td className="p-2 min-w-[100px] text-left">{v.username}</td>
                      <td className="p-2 min-w-[100px] text-left">{v.price}</td>
                      <td className="p-2 min-w-[100px] text-left" style={{ color: v.status == 1 ? "green" : "red" }}>
                        {v.status == 1 ? "success" : "deny"}
                      </td>
                      <td className="p-2 min-w-[100px] text-right">
                        <button onClick={() => setDe(v.id)}>detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={fil.page + 1}
                setPage={setfilter}
                total={data?.totalPage}
                allEle={data?.totalElement}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
