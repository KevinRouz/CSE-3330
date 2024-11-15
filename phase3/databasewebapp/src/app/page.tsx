"use client";
import { useState } from "react";

export default function Home() {
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [data, setData] = useState("");
  const [showItemDetails, setShowItemDetails] = useState(false);

  const handleDisplay = async () => {
    try {
      const queryParam = itemId || name; // Check if either itemId or name is provided
      if (!queryParam) {
        setResult("Please provide either an Item ID or Name.");
        setShowItemDetails(false);
        return;
      }
  
      const res = await fetch(`/api/items?query=${queryParam}`);
  
      const responseJson = await res.json();
  
      if (res.ok) {
        const { message, data } = responseJson;
        setResult(message); // Set the message as the result
        setShowItemDetails(true); // Show item details only if fetch is successful
        setData(data);
      } else {
        const { error } = responseJson;
        setResult(error); // Set the error message
        setShowItemDetails(false); // Hide item details if there's an error
      }
    } catch (error) {
      console.error("Error fetching item:", error);
      setResult("An error occurred while fetching the item details.");
      setShowItemDetails(false); // Hide item details on error
    }
    handleClear();
  };
  
  const handleInsert = async () => {
    try {
      console.log({ name, price, description }); // Check if this logs correctly
      const res = await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, description }),
      });
  
      const responseJson = await res.json();
  
      if (res.ok) {
        const { message, data } = responseJson;
        setResult(message); // Set the result message
        setData(data);
        setShowItemDetails(true);
      } else {
        const { error } = responseJson;
        setResult(error); // Set the error message
        setShowItemDetails(false);
      }
    } catch (error) {
      console.error("Error inserting item:", error);
      setResult("An error occurred while inserting the item.");
      setShowItemDetails(false); // Hide item details on error
    }
    handleClear();
  };
  
  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, name, price, description }),
      });
  
      const responseJson = await res.json();
  
      if (res.ok) {
        const { message, data } = responseJson;
        setResult(message); // Set the result message
        setData(data);
        setShowItemDetails(true);
      } else {
        const { error } = responseJson;
        setResult(error); // Set the error message
        setShowItemDetails(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setResult("An error occurred while updating the item.");
      setShowItemDetails(false); // Hide item details on error
    }
    handleClear();
  };
  
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/delete?itemId=${itemId}`, {
        method: "DELETE",
      });
  
      const responseJson = await res.json();
  
      if (res.ok) {
        const { message, data } = responseJson;
        setResult(message); // Set the success message
        setData(data); // Set the deleted item details
        setShowItemDetails(true);
      } else {
        const { error } = responseJson;
        setResult(error); // Set the error message
        setShowItemDetails(false);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setResult("An error occurred while deleting the item.");
      setShowItemDetails(false); // Hide item details on error
    }
    handleClear();
  };

  const handleClear = () => {
    setItemId("");
    setName("");
    setPrice("");
    setDescription("");
  };

  // Render the item details as a table
  const renderItemDetails = (item: any) => {
    if (!item || !showItemDetails) return null;

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

        {renderItemDetails(data)}
      </div>
    </div>
  );
}
