"use client";
import { useState } from "react";

export default function Home() {
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleDisplay = async () => {
    try {
      const res = await fetch(`/api/items?itemId=${itemId}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        setResult(errorData.error || "An error occurred while retrieving the item.");
        return;
      }
      
      const data = await res.json();
      console.log("Response data:", data); // Log the data received from the backend
      setResult(data);
    } catch (error) {
      console.error("Error fetching item:", error);
      setResult("An error occurred while fetching the item details.");
    }
  };

  const handleInsert = async () => {
    console.log({ name, price, description }); // Check if this logs correctly
    const res = await fetch("/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
  };
  const handleUpdate = async () => {
    const res = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, name, price, description }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/delete?itemId=${itemId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setResult(data.message || data.error);
  };

  // Render the item details as a table
  const renderItemDetails = (item: any) => {
    if (!item) return null;

    return (
      <table className="min-w-full mt-4 border-collapse text-black">
        <thead>
          <tr>
            <th className="border px-4 py-2">Field</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(item).map((key) => (
            <tr key={key}>
              <td className="border px-4 py-2 font-bold">{key}</td>
              <td className="border px-4 py-2">{item[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
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
            className="text-black w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-black w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black w-full p-2 border border-gray-300 rounded mb-2"
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
          Insert Item
        </button>

        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-500 text-white py-2 rounded mb-4 hover:bg-yellow-600"
        >
          Update Item
        </button>

        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded mb-4 hover:bg-red-600"
        >
          Delete Item
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-200 rounded text-black min-h-[100px]">
            <h2 className="font-bold">Result:</h2>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        {renderItemDetails(result)}
      </div>
    </div>
  );
}
