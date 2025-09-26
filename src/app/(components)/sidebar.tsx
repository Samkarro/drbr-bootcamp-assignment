"use client";
import { Dispatch, SetStateAction } from "react";
import "./styles.sidebar.css";
import SidebarContent from "./sidebar-content";

export default function Sidebar({
  token,
  setIsSidebarOpen,
}: {
  token: string | null;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className="sidebar-overlay"
        onClick={() => setIsSidebarOpen(false)}
      />
      <div className="sidebar-container open">
        <SidebarContent token={token} />
      </div>
    </>
  );
}
