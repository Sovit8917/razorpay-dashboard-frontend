"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
{/* hamburger */}
           <button className="md:hidden text-gray-900" onClick={() => setOpen(true)} aria-label="Open menu">
  <Menu size={24} />
</button>

            <span className="text-xl font-bold text-gray-800">
              MyApp
            </span>

        {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 ml-6">
              <Link
  href="/dashboard"
  className={`text-sm font-medium transition px-5 py-2.5 rounded ${
    pathname === "/dashboard"
      ? "text-blue-600 bg-blue-100 font-semibold"
      : "text-gray-800 hover:text-blue-600"
  }`}
>
  Dashboard
</Link>

<Link
  href="/payment"
  className={`text-sm font-medium transition px-6 py-2.5 rounded ${
    pathname === "/payment"
      ? "text-blue-600 font-semibold bg-blue-100"
      : "text-gray-800 hover:text-blue-600"
  }`}
>
  Courses
</Link>
            </div>
          </div>
          {/* right side */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session?.user?.email}
            </span>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
{/* Mobile Navigation */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
<div
  className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="flex flex-col h-full">

    <div>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-lg text-gray-800">Menu</h2>
        <button className="text-gray-700" onClick={() => setOpen(false)} aria-label="Close menu">
  <X size={22} />
</button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col p-4 gap-3">
        <Link
  href="/dashboard"
  onClick={() => setOpen(false)}
  className={`px-3 py-2 rounded-md font-medium ${
    pathname === "/dashboard"
      ? "text-blue-600 bg-blue-100"
      : "text-gray-800 hover:text-blue-600 hover:bg-gray-100"
  }`}
>
  Dashboard
</Link>

<Link
  href="/payment"
  onClick={() => setOpen(false)}
  className={`px-3 py-2 rounded-md font-medium ${
    pathname === "/payment"
      ? "text-blue-600 bg-blue-100"
      : "text-gray-800 hover:text-blue-600 hover:bg-gray-100"
  }`}
>
  Courses
</Link>
      </div>
    </div>

<div className="p-4 border-t mt-auto">
  <p className="text-sm text-gray-600 break-words mb-3">
    {session?.user?.email}
  </p>

  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
  >
    Logout
  </button>
</div>

  </div>
</div>
    </>
  );
}

export default Navbar;