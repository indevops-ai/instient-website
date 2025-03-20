"use client";

import * as React from "react";

const userData = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+1 234 567 890",
};

export default function UserProfilePage() {
  return (
    <div className="flex justify-center items-center h-screen font-ubuntu bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}!</h2>
        <div className="text-left">
          <p className="text-lg font-medium">User Details:</p>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700"><strong>Name:</strong> {userData.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
            <p className="text-gray-700"><strong>Mobile No:</strong> {userData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
