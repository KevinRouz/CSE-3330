"use client";
import { useState } from "react";

export default function Home() {
  const [itemId, setItemId] = useState("");
  const [result, setResult] = useState("");

  const handleDisplay = () => {
    // Call API to get item details by item ID or item name
    setResult(`Displaying details for Item ID: ${itemId}`);
  };

  const handleInsert = () => {
    // Call API to insert new item "Frozen Broccoli"
    setResult("Inserted item: Frozen Broccoli");
  };

  const handleUpdate = () => {
    // Call API to update "Frozen Broccoli" to "Organic Fresh Broccoli"
    setResult("Updated item: Frozen Broccoli to Organic Fresh Broccoli");
  };

  const handleDelete = () => {
    // Call API to delete "Organic Fresh Broccoli"
    setResult("Deleted item: Organic Fresh Broccoli");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Item Management</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleDisplay}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Display Item
          </button>
        </div>

        <button
          onClick={handleInsert}
          className="w-full bg-green-500 text-white py-2 rounded mb-4 hover:bg-green-600"
        >
          Insert Frozen Broccoli
        </button>

        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-500 text-white py-2 rounded mb-4 hover:bg-yellow-600"
        >
          Update to Organic Fresh Broccoli
        </button>

        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete Organic Fresh Broccoli
        </button>

        {result && (
          <div className="mt-4 p-3 bg-gray-200 rounded text-center">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
