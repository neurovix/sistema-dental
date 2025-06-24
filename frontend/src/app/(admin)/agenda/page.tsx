import Calendar from "@/components/calendar/Calendar";
import { Navbar } from "@/components/ui/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "DentaNova - Calendario",
  description:
    "Esta es la pagina para la agendacion de citas dentro del sistema",
};

export default function page() {
  return (
    <div>
      <Navbar />
      <Calendar />
    </div>
  );
}
