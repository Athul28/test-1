"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [graceTime, setGraceTime] = useState<{ time: string; id: string }[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [addGraceClicked, setAddGraceClicked] = useState(false);
  const [newGrace, setNewGrace] = useState(0);
  const [isGraceButtonClicked, setIsGraceButtonClicked] = useState(false);
  const [editedTime, setEditedTime] = useState(0);
  const [itemId, setItemId] = useState("");

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEdit(false);
  };

  const getGractTime = async () => {
    console.log("Clicked");
    const grace_time = await fetch("/api/graceTime", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await grace_time.json();
    setGraceTime(res);
  };

  const editTime = () => {
    setIsEdit(true);
  };

  const saveTime = () => {
    setIsEdit(false);
  };

  const updateGrace = async (id: string) => {
    const res = await fetch("/api/updateGraceTime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, time: editedTime }),
    });
    setIsGraceButtonClicked(false);
    setEditedTime(0);
    getGractTime();
  };

  const addGrace = async () => {
    const res = await fetch("api/graceTime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: newGrace,
      }),
    });
    setAddGraceClicked(false);
    getGractTime();
  };

  useEffect(() => {
    getGractTime();
  }, []);

  return (
    <div className="p-4">
      <p className="text-2xl font-bold mb-4">Grace Time</p>
      <button
        onClick={handleButtonClick}
        className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
      >
        Settings
      </button>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-10 bg-black bg-opacity-50">
          <div className="w-full max-w-md border border-black p-4 bg-white rounded-md shadow-lg">
            <div className="relative">
              <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-2xl text-black p-1 w-2 rounded-full"
              >
              &times;
              </button>
            </div>
            <p className="font-bold text-lg mb-2">Grace Time</p>
            <p className="mb-2">Current Grace Time</p>
            <div className="flex flex-row flex-wrap mb-4">
              {graceTime.map((time, i) => (
                <button
                  key={i}
                  className="p-2 m-1 border border-gray-700 rounded-md w-fit hover:bg-gray-200"
                  onClick={() => {
                    setIsGraceButtonClicked(true);
                    setItemId(time.id);
                  }}
                >
                  {time.time} mins
                </button>
              ))}
              {isGraceButtonClicked && isEdit && (
                <div className="flex flex-col items-start mt-2">
                  <input
                    type="number"
                    className="border border-gray-300 p-1 rounded-md mb-2"
                    onChange={(e) => {
                      setEditedTime(parseInt(e.target.value));
                    }}
                  />
                  <button
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => updateGrace(itemId)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
            {!isEdit? (
              <button
                className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
                onClick={editTime}
              >
                Edit grace time
              </button>
            ) : (
              <div className="flex flex-col items-start">
                {addGraceClicked && (
                  <div className="flex flex-col items-start mb-2">
                    <input
                      type="number"
                      className="border border-gray-300 p-1 rounded-md mb-2"
                      onChange={(e) => {
                        setNewGrace(parseInt(e.target.value));
                      }}
                    />
                    <button
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                      onClick={addGrace}
                    >
                      Add
                    </button>
                  </div>
                )}
                <div>

                <button
                  className="bg-orange-500 text-white p-2 rounded-md mr-2 hover:bg-orange-600"
                  onClick={() => {
                    setAddGraceClicked(true);
                  }}
                >
                  Add new grace time
                </button>
                <button
                  className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
                  onClick={saveTime}
                >
                  Save
                </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
