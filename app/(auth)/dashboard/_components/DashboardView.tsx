"use client";
import { useSession, signOut } from "next-auth/react";


export default function DashboardView() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User Information
          </h2>
          {session?.user && (
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Name:</span>{" "}
                {session.user.name}
              </p>
              <p>
                <span className="font-medium text-gray-800">Email:</span>{" "}
                {session.user.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
