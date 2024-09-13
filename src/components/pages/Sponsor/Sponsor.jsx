import axios from "axios";
import { useEffect, useState } from "react";
import { instance } from "../../../config/AxiosConfig";
import firebase from "firebase/compat/app";
import CreateSponsor from "./CreatSponsor";
const Sponsor = () => {
  //   const email = firebase.auth().currentUser.email;
  const [data, setData] = useState({
    fullName: "",
    email: "",
    image: "",
  });
  const [events, setEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  useEffect(() => {
    //     getData(email).then((res) => {
    //       let data = res.data;
    //       setData({
    //         ...data,
    //         fullName: `${data.firstName} ${data.lastName}`,
    //         email: email,
    //         image: data.image,
    //       });
    //     });
  });
  const getData = async (email) => {
    try {
      return await instance.get("url");
    } catch (err) {
      return null;
    }
  };

  return (
    <>
      {openAdd ? <CreateSponsor setOpen={setOpenAdd} /> : null}
      <div className="flex justify-start w-full gap-3 h-[85vh]">
        <div className="bg-white overflow-hidden  border-r-[1px] border-black px-5 w-[400px]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Sponsor Profile
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Owner</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.fullName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img src={data.image} alt="" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="w-[calc(100%_-_400px_-_0.75rem)] px-5">
          <div className="pr-4 py-5 pl-0 flex justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Events
            </h3>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                setOpenAdd(true);
              }}
            >
              + Add event
            </button>
          </div>
          <table className="table-fixed text-black w-[100%] opacity-40">
            <thead className="text-left bg-slate-300">
              <tr className="px-3">
                <th className="w-[80px]">Index</th>
                <th className="min-w-[180px]">Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((v, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td>{v.image}</td>
                  <td>{v.price}</td>
                  <td>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Sponsor;
