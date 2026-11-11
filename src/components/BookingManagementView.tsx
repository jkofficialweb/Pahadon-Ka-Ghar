import React, { useState } from 'react';
import {
  Search,
  CalendarCheck,
  UserCheck,
  Clock,
  IndianRupee,
  Plus,
  Printer,
  CheckCircle2,
  XCircle,
  FileText,
  Building,
  KeyRound,
  Filter,
  MessageSquare,
  Phone,
  Bed,
} from 'lucide-react';
import { Booking, BookingStatus } from '../types/hotel.ts';
import { formatINR } from '../utils/booking.ts';
import { HOTEL_INFO } from '../data/hotelData.ts';

interface BookingManagementViewProps {
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onAssignRoomNumber: (bookingId: string, roomNumber: string) => void;
  onAddNote: (bookingId: string, note: string) => void;
  onOpenNewBookingModal: () => void;
  initialLookupRef?: string;
}

export const BookingManagementView: React.FC<BookingManagementViewProps> = ({
  bookings,
  onUpdateBookingStatus,
  onAssignRoomNumber,
  onAddNote,
  onOpenNewBookingModal,
  initialLookupRef = '',
}) => {
  const [activeTab, setActiveTab] = useState<'frontdesk' | 'lookup'>('frontdesk');

  // Front desk state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);

  // Quick room number assign state
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [tempRoomNumber, setTempRoomNumber] = useState('');

  // Staff note state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  // Guest lookup state
  const [lookupQuery, setLookupQuery] = useState(initialLookupRef);
  const [foundBooking, setFoundBooking] = useState<Booking | null>(() => {
    if (initialLookupRef) {
      return bookings.find((b) => b.reference.toLowerCase() === initialLookupRef.toLowerCase()) || null;
    }
    return null;
  });
  const [hasSearchedLookup, setHasSearchedLookup] = useState(Boolean(initialLookupRef));

  const handleLookupSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearchedLookup(true);
    const q = lookupQuery.trim().toLowerCase();
    if (!q) {
      setFoundBooking(null);
      return;
    }
    const match = bookings.find(
      (b) =>
        b.reference.toLowerCase().includes(q) ||
        b.guestPhone.toLowerCase().includes(q) ||
        b.guestEmail.toLowerCase().includes(q)
    );
    setFoundBooking(match || null);
  };

  // KPIs
  const totalBookings = bookings.length;
  const activeCheckedIn = bookings.filter((b) => b.status === 'checked_in').length;
  const confirmedUpcoming = bookings.filter((b) => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      b.guestName.toLowerCase().includes(q) ||
      b.reference.toLowerCase().includes(q) ||
      b.roomName.toLowerCase().includes(q) ||
      b.guestPhone.includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
            Confirmed
          </span>
        );
      case 'checked_in':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
            Checked-In
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-stone-100 text-stone-700 rounded-md border border-stone-200">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-rose-50 text-rose-700 rounded-md border border-rose-200">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>Pahadon Ka Ghar · Front Office & Reservations</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 font-serif mt-1">
            Booking & Reservation Management
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Streamlined property management system for room allocations, guest check-ins, walk-ins, and direct reservation lookups.
          </p>
        </div>

        {/* Tab switch between Front Desk and Guest Lookup */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl shrink-0 self-start md:self-auto border border-stone-200">
          <button
            onClick={() => setActiveTab('frontdesk')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'frontdesk'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Front Desk PMS
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'lookup'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Guest Voucher Lookup
          </button>
        </div>
      </div>

      {activeTab === 'frontdesk' ? (
        <div className="space-y-6">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Total Reservations</span>
                <CalendarCheck className="w-4 h-4 text-amber-700" />
              </div>
              <div className="mt-2 text-2xl font-bold text-stone-900 font-mono tabular-nums">
                {totalBookings}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">All registered stays</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Currently In-House</span>
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-700 font-mono tabular-nums">
                {activeCheckedIn}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">Active checked-in guests</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Upcoming Confirmed</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-700 font-mono tabular-nums">
                {confirmedUpcoming}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">Expected arrivals</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Gross Room Value</span>
                <IndianRupee className="w-4 h-4 text-amber-800" />
              </div>
              <div className="mt-2 text-2xl font-bold text-amber-900 font-mono tabular-nums">
                {formatINR(totalRevenue)}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">Excluding cancellations</span>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by Guest Name, Phone or Ref (e.g. PKG-2026)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700 outline-none"
              />
            </div>

            {/* Status Segmented Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {(['all', 'confirmed', 'checked_in', 'completed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    statusFilter === status
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Quick Walk-in Button */}
            <button
              onClick={onOpenNewBookingModal}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Reservation</span>
            </button>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Reference</th>
                    <th className="py-3.5 px-4 font-semibold">Guest & Contact</th>
                    <th className="py-3.5 px-4 font-semibold">Room & Stay</th>
                    <th className="py-3.5 px-4 font-semibold">Dates & Nights</th>
                    <th className="py-3.5 px-4 font-semibold">Room #</th>
                    <th className="py-3.5 px-4 font-semibold">Total</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-stone-500">
                        No reservations found matching "{searchTerm}".
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-900">
                          {b.reference}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-900">{b.guestName}</div>
                          <div className="text-stone-500 text-[11px]">{b.guestPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-800 truncate max-w-[180px]">
                            {b.roomName}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {b.guestsCount} Guest{b.guestsCount > 1 ? 's' : ''} · {b.mealPlanName}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-stone-800 font-medium">
                            {b.checkIn} → {b.checkOut}
                          </div>
                          <div className="text-stone-500 text-[11px]">
                            {b.nights} Night{b.nights > 1 ? 's' : ''}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {editingRoomId === b.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={tempRoomNumber}
                                onChange={(e) => setTempRoomNumber(e.target.value)}
                                placeholder="101"
                                className="w-16 px-1.5 py-1 text-xs border rounded bg-white outline-none"
                              />
                              <button
                                onClick={() => {
                                  onAssignRoomNumber(b.id, tempRoomNumber);
                                  setEditingRoomId(null);
                                }}
                                className="px-1.5 py-1 bg-amber-800 text-white rounded text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingRoomId(b.id);
                                setTempRoomNumber(b.roomNumber || '');
                              }}
                              className="inline-flex items-center gap-1 text-stone-700 hover:text-amber-800 cursor-pointer font-medium"
                              title="Click to assign room number"
                            >
                              <KeyRound className="w-3 h-3 text-stone-400" />
                              <span>{b.roomNumber || 'Assign'}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                          {formatINR(b.totalAmount)}
                          <div className="text-[10px] font-normal text-stone-500">
                            {b.paymentStatus === 'paid' ? 'Paid' : 'Due at Hotel'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(b.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'checked_in')}
                                className="px-2.5 py-1 text-[11px] font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-md transition-colors cursor-pointer"
                              >
                                Check In
                              </button>
                            )}
                            {b.status === 'checked_in' && (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                                className="px-2.5 py-1 text-[11px] font-medium bg-stone-700 hover:bg-stone-800 text-white rounded-md transition-colors cursor-pointer"
                              >
                                Check Out
                              </button>
                            )}
                            {b.status !== 'cancelled' && b.status !== 'completed' && (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                                className="px-2 py-1 text-[11px] text-stone-500 hover:text-rose-700 transition-colors cursor-pointer"
                                title="Cancel Reservation"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedBookingForDetails(b)}
                              className="px-2 py-1 text-[11px] text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md cursor-pointer"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Guest Voucher Lookup View */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-lg text-stone-900 font-serif">
              Search Your Reservation Voucher
            </h3>
            <p className="text-xs text-stone-600">
              Enter your booking reference (e.g. <span className="font-mono font-semibold">PKG-2026-8812</span>) or registered mobile number to retrieve your stay details and printable voucher.
            </p>

            <form onSubmit={handleLookupSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Booking Reference or Phone..."
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 outline-none focus:ring-2 focus:ring-amber-700"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Find Voucher
              </button>
            </form>
          </div>

          {hasSearchedLookup && (
            foundBooking ? (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-xs text-stone-500 block">Confirmed Reservation</span>
                    <h4 className="text-xl font-bold text-stone-900 font-mono">
                      {foundBooking.reference}
                    </h4>
                  </div>
                  <div>{getStatusBadge(foundBooking.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 block">Guest Name</span>
                    <span className="font-semibold text-stone-900 text-sm">{foundBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Room Allocated</span>
                    <span className="font-semibold text-stone-900 text-sm">
                      {foundBooking.roomName} {foundBooking.roomNumber ? `(Room #${foundBooking.roomNumber})` : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Check-In</span>
                    <span className="font-semibold text-stone-900">{foundBooking.checkIn} (from 12 PM)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Check-Out</span>
                    <span className="font-semibold text-stone-900">{foundBooking.checkOut} (until 11 AM)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Party Size</span>
                    <span className="font-semibold text-stone-900">{foundBooking.guestsCount} Guests · {foundBooking.nights} Nights</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Meal Plan</span>
                    <span className="font-semibold text-stone-900">{foundBooking.mealPlanName}</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between font-bold text-stone-900 text-sm">
                    <span>Total Amount</span>
                    <span className="font-mono">{formatINR(foundBooking.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Payment Status</span>
                    <span className="capitalize font-semibold text-amber-800">
                      {foundBooking.paymentStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <a
                    href={`tel:${HOTEL_INFO.phone1}`}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Front Desk ({HOTEL_INFO.phone1})</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-2">
                <XCircle className="w-10 h-10 text-stone-400 mx-auto" />
                <h4 className="font-bold text-stone-800">No Booking Found</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  We could not find any active booking matching "{lookupQuery}". Please check your confirmation reference or dial our front desk at {HOTEL_INFO.phone1}.
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Booking Details Dialog Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-stone-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h4 className="font-bold text-base text-stone-900">
                  Booking Details · {selectedBookingForDetails.reference}
                </h4>
                <p className="text-xs text-stone-500">
                  Created on {new Date(selectedBookingForDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 block">Guest</span>
                  <span className="font-bold text-stone-900 text-sm">
                    {selectedBookingForDetails.guestName}
                  </span>
                  <div className="text-stone-600">{selectedBookingForDetails.guestPhone}</div>
                  <div className="text-stone-500 truncate">{selectedBookingForDetails.guestEmail}</div>
                </div>
                <div>
                  <span className="text-stone-500 block">Room</span>
                  <span className="font-bold text-stone-900 text-sm">
                    {selectedBookingForDetails.roomName}
                  </span>
                  <div className="text-stone-600">
                    Room No: {selectedBookingForDetails.roomNumber || 'Not yet assigned'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-500 block">Check-In</span>
                  <span className="font-semibold text-stone-900">{selectedBookingForDetails.checkIn}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Check-Out</span>
                  <span className="font-semibold text-stone-900">{selectedBookingForDetails.checkOut}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Total Tariff</span>
                  <span className="font-mono font-bold text-amber-900">
                    {formatINR(selectedBookingForDetails.totalAmount)}
                  </span>
                </div>
              </div>

              {selectedBookingForDetails.specialRequests && (
                <div>
                  <span className="text-stone-500 block font-semibold">Special Guest Requests</span>
                  <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200/60 text-stone-700 mt-1">
                    {selectedBookingForDetails.specialRequests}
                  </div>
                </div>
              )}

              {/* Staff Notes */}
              <div>
                <span className="text-stone-500 block font-semibold mb-1">Front Desk Notes</span>
                {editingNoteId === selectedBookingForDetails.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      rows={2}
                      className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-amber-700"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-2.5 py-1 text-stone-600 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onAddNote(selectedBookingForDetails.id, tempNote);
                          selectedBookingForDetails.notes = tempNote;
                          setEditingNoteId(null);
                        }}
                        className="px-3 py-1 bg-amber-800 text-white rounded text-xs"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-700 italic">
                      {selectedBookingForDetails.notes || 'No internal notes entered.'}
                    </span>
                    <button
                      onClick={() => {
                        setEditingNoteId(selectedBookingForDetails.id);
                        setTempNote(selectedBookingForDetails.notes || '');
                      }}
                      className="text-amber-800 font-medium hover:underline text-[11px] shrink-0 ml-2"
                    >
                      Edit Note
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
