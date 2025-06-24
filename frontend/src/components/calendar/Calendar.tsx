"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

interface CalendarEvent extends EventInput {
  extendedProps: {
    firstName: string;
    lastName: string;
    phone: string;
    time: string;
    contactMethod: string[];
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [contactMethods, setContactMethods] = useState<string[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  useEffect(() => {}, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setAppointmentDate(selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setFirstName(event.extendedProps.firstName || "");
    setLastName(event.extendedProps.lastName || "");
    setPhone(event.extendedProps.phone || "");
    setAppointmentDate(event.start?.toISOString().split("T")[0] || "");
    setAppointmentTime(event.extendedProps.time || "");
    setContactMethods(event.extendedProps.contactMethod || []);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !appointmentDate ||
      !appointmentTime
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (contactMethods.length === 0) {
      alert("Por favor, seleccione al menos un método de contacto.");
      return;
    }

    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: `${firstName} ${lastName} - ${appointmentTime}`,
                start: appointmentDate,
                extendedProps: {
                  firstName,
                  lastName,
                  phone,
                  time: appointmentTime,
                  contactMethod: contactMethods,
                },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: `${firstName} ${lastName} - ${appointmentTime}`,
        start: appointmentDate,
        allDay: false,
        extendedProps: {
          firstName,
          lastName,
          phone,
          time: appointmentTime,
          contactMethod: contactMethods,
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const handleContactMethodChange = (method: string) => {
    setContactMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const resetModalFields = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setAppointmentDate("");
    setAppointmentTime("");
    setContactMethods([]);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Calendar Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Agenda de citas
            </h2>
            <p className="text-blue-100 mt-1">
              Selecciona un día para agendar una nueva cita
            </p>
          </div>

          <div className="p-6">
            <div className="custom-calendar">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next addEventButton",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                customButtons={{
                  addEventButton: {
                    text: "🦷 Nueva Cita",
                    click: openModal,
                  },
                }}
                locale="es"
                buttonText={{
                  today: "Hoy",
                  month: "Mes",
                  week: "Semana",
                  day: "Día",
                }}
                dayHeaderFormat={{ weekday: "short" }}
                height="auto"
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-2xl mx-4 my-8 overflow-hidden"
        >
          <div className="flex flex-col h-full">
            {/* Modal Header - Mejorado */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                {selectedEvent ? "Editar Cita" : "Nueva Cita"}
              </h3>
              <p className="text-blue-100 mt-2 text-sm">
                {selectedEvent
                  ? "Modifica los datos de la cita"
                  : "Completa la información del paciente"}
              </p>
            </div>

            {/* Modal Body - Con scroll contenido */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Nombre y Apellidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="Ingrese el nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="Ingrese los apellidos"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Número de Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Ej: +52 844 123 4567"
                  />
                </div>

                {/* Día y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Día de la Cita *
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Hora de la Cita *
                    </label>
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-500"
                    >
                      <option value="">Seleccione una hora</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Métodos de Contacto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Método de Contacto Preferido *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={contactMethods.includes("whatsapp")}
                        onChange={() => handleContactMethodChange("whatsapp")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                          contactMethods.includes("whatsapp")
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 group-hover:border-green-400"
                        }`}
                      >
                        {contactMethods.includes("whatsapp") && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          WhatsApp
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={contactMethods.includes("llamada")}
                        onChange={() => handleContactMethodChange("llamada")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                          contactMethods.includes("llamada")
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 group-hover:border-blue-400"
                        }`}
                      >
                        {contactMethods.includes("llamada") && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          Llamada
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fijo */}
            <div className="border-t border-gray-200 p-6 bg-white rounded-b-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeModal}
                  type="button"
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddOrUpdateEvent}
                  type="button"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {selectedEvent ? "Actualizar Cita" : "Agendar Cita"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .fc-header-toolbar {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          padding: 1rem;
          border-radius: 12px 12px 0 0;
          margin-bottom: 0 !important;
        }

        .fc-toolbar-title {
          color: white !important;
          font-size: 1.5rem !important;
          font-weight: 600 !important;
        }

        .fc-button-primary {
          background: rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          color: white !important;
          border-radius: 8px !important;
          font-weight: 500 !important;
          padding: 0.5rem 1rem !important;
          transition: all 0.2s ease !important;
        }

        .fc-button-primary:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          border-color: rgba(255, 255, 255, 0.5) !important;
          transform: translateY(-1px);
        }

        .fc-button-primary:disabled {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          opacity: 0.6 !important;
        }

        .fc-daygrid-day {
          background: white;
          border-color: #e5e7eb !important;
        }

        .fc-daygrid-day:hover {
          background: #f0f9ff !important;
        }

        .fc-daygrid-day-top {
          padding: 0.5rem;
        }

        .fc-event {
          background: linear-gradient(135deg, #3b82f6, #10b981) !important;
          border: none !important;
          border-radius: 6px !important;
          padding: 2px 6px !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
          color: white !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }

        .fc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
        }

        .fc-daygrid-event-dot {
          display: none !important;
        }

        .fc-col-header-cell {
          background: #f8fafc !important;
          border-color: #e5e7eb !important;
          font-weight: 600 !important;
          color: #374151 !important;
          padding: 0.75rem 0.5rem !important;
        }

        .fc-scrollgrid {
          border-radius: 0 0 12px 12px !important;
          overflow: hidden !important;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: #e5e7eb !important;
        }
      `}</style>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div className="flex items-center gap-1 text-white">
      <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
      <div className="flex-1 truncate">
        <div className="font-medium text-xs">{eventInfo.event.title}</div>
      </div>
    </div>
  );
};

export default Calendar;
