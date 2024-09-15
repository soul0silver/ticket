import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import OrderDetail from "./OrderDetail";
import Pagination from "./Pagination";
import { instance } from "../../../../config/AxiosConfig";

export default function OrderManager() {
  const [data, setData] = useState(null);
  const [detail, setDe] = useState();
  const [page, setPage] = useState(0);

  const [summ, setSumm] = useState([]);
  const [events, setEv] = useState([]);
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
  useEffect(() => {
    instance.get(`/tickets?year=${year}&page=${page}`).then((res) => {
      setData(res.data);
    });
  }, [page, year]);

  async function getSummary(id) {
    return await instance.get(`chart/${id}`);
  }
  let myChart = null;
  useEffect(() => {
    instance.get("events/rank").then((res) => {
      setEv(res.data);
      if (res?.data[0]?.id !== undefined)
        getSummary(res?.data[0]?.id).then((res) => {
          if (res.status === 200) {
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            let listData = arr.map((v) => {
              let temp = res.data.filter((m) => m.month === v);
              if (temp.length > 0) {
                return temp[0].receive;
              }
              return 0;
            });
            let config = {
              type: "bar",
              data: {
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December ",
                ],
                datasets: [
                  {
                    label: new Date().getFullYear(),
                    backgroundColor: "#4a5568",
                    borderColor: "#4a5568",
                    data: listData,
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
    });
  }, []);

  useEffect(() => {
    if (detail)
      getSummary(detail).then((res) => {
        if (res.status === 200) {
          let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          let listData = arr.map((v) => {
            let temp = res.data.filter((m) => m.month === v);
            if (temp.length > 0) {
              return temp[0].receive;
            }
            return 0;
          });

          let config = {
            type: "bar",
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December ",
              ],
              datasets: [
                {
                  label: new Date().getFullYear(),
                  backgroundColor: "#4a5568",
                  borderColor: "#4a5568",
                  data: listData,
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
  }, [detail]);
  return (
    <>
      {detail && (
        <OrderDetail
          id={detail}
          close={setDe}
          order={data.list?.filter((v, i) => v.id === detail)[0]}
        />
      )}
      <div className="flex py-8 flex-col space-y-6 items-center justify-center min-h-[600px] lg:pl-[20px] pl-[20px] pr-[10px] mb-5">
        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-300">
            <h2 className="font-semibold text-gray-800">Summary info</h2>
          </header>
          <div className="p-3">
            <div className="flex lg:flex-row justify-between">
              <div className="p-2 w-[60%] h-[300px] mb-3">
                <canvas id="bar-chart" />
              </div>
              <div className="p-2">
                <table className="table-auto w-full border">
                  <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                    <tr className="">
                      <th className="px-2 py-1 ">Event</th>
                      <th className="px-2 py-1 ">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events?.map((v, i) => (
                      <tr
                        className="cursor-pointer"
                        key={i}
                        onClick={() => setDe(v.id)}
                      >
                        <td className="px-2 py-1 ">{v.title}</td>
                        <td className="px-2 py-1 text-right">{v.ranks}</td>
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
            <h2 className="font-semibold text-gray-800">Ticket list</h2>

            <div className="flex space-x-4">
              <div className="flex space-x-2">
                <label className="font-bold text-gray-800" htmlFor="">
                  Year:
                </label>
                <input
                  type="number"
                  name=""
                  id=""
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  min={new Date().getFullYear() - 3}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                  <tr>
                    <th className="p-2 min-w-[100px] text-left">Create at</th>
                    <th className="p-2 min-w-[100px] text-left">Email</th>
                    <th className="p-2 min-w-[100px] text-left">Quantity</th>
                    <th className="p-2 min-w-[100px] text-left">Event</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data?.content?.map((v, i) => (
                    <tr key={i}>
                      <td className="p-2 min-w-[100px] text-left">
                        {new Date(v.createAt).toLocaleString()}
                      </td>
                      <td className="p-2 min-w-[100px] text-left">{v.email}</td>
                      <td className="p-2 min-w-[100px] text-left">
                        {v.quantity}
                      </td>
                      <td className="p-2 min-w-[100px] text-left">{v.name}</td>
                      <td className="p-2 min-w-[100px] text-right">
                        <button onClick={() => setDe(v.id)}>detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={data?.number + 1}
                setPage={setPage}
                total={data?.totalPages}
                allEle={data?.totalElements}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
