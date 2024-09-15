import { Route, Link, Routes } from "react-router-dom";
import OrderManager from "./order/page";
import { useState } from "react";
import EventManage from "./event-manage/EventManage";

export default function AdminLayout() {
  const [route, setRoute] = useState("dashboard");
  return (
    <>
      <div className="flex w-full">
        <div>
          {/* component */}
          <div className="h-[calc(100vh_-_50px)] min-w-[255px] flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
            <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-[calc(100vh_-_52px)] border-r z-[21]">
              <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                  <li onClick={() => setRoute("dashboard")}>
                    <Link
                      className={
                        route !== "dashboard"
                          ? `relative flex flex-row items-center h-11 focus:outline-none
                       hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4
                        hover:border-indigo-500 pr-6 `
                          : `relative flex flex-row items-center h-11 focus:outline-none
                        hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4
                         border-indigo-500 pr-6 `
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li onClick={() => setRoute("event")}>
                    <Link
                      className={route !== "event"
                        ? `relative flex flex-row items-center h-11 focus:outline-none
                     hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4
                      hover:border-indigo-500 pr-6 `
                        : `relative flex flex-row items-center h-11 focus:outline-none
                      hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4
                       border-indigo-500 pr-6 `}
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Event manage
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {route === "dashboard" && <OrderManager />}
          {route === "event" && <EventManage />}
        </div>
      </div>
    </>
  );
}
