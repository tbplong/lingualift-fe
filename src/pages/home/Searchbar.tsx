import React, { useState } from "react";
import { CloseIcon } from "@/components/icons";

const Searchbar = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState(false);
  const Memaybeo = (enven) => {
    //console.log(enven.target.value);

    if (enven.target.value === "") {
      setName(false);
    } else {
      setName(true);
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <form className="flex items-center max-w-lg flex-1">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pe-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search di ma..."
            required
            onChange={(enven) => {
              Memaybeo(enven);
            }}
          />
          {name && (
            <button
              type="button"
              id="clear-search-btn"
              className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
              onClick={() => {
                const input = document.getElementById(
                  "voice-search",
                ) as HTMLInputElement;
                if (input) {
                  input.value = "";
                }
                setName(false);
              }}
            >
              <CloseIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </form>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <span className="text-lg font-medium text-gray-800">
          October 26, 2025
        </span>
      </div>
    </div>
  );
};
export default Searchbar;
