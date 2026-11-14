import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  Utensils,
  CheckCircle2,
  Phone,
  Printer,
  Sparkles,
  BedDouble,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData.ts';
import { MealPlanId, Booking } from '../types/hotel.ts';
import {
  calculateNights,
  calculateBookingTotals,
  generateBookingReference,
  formatINR,
  isValidDateRange,
  MEAL_PLAN_RATES,
} from '../utils/booking.ts';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: string;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultGuests?: number;
  onBookingConfirmed: (newBooking: Booking) => void;
  onGoToManagement: (bookingRef?: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomId,
  defaultCheckIn,
  defaultCheckOut,
  defaultGuests = 2,
  onBookingConfirmed,
  onGoToManagement,
}) => {
  // Today and Tomorrow YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [roomId, setRoomId] = useState(preselectedRoomId || ROOMS_DATA[0].id);
  const [checkIn, setCheckIn] = useState(defaultCheckIn || todayStr);
  const [checkOut, setCheckOut] = useState(defaultCheckOut || tomorrowStr);
  const [guests, setGuests] = useState(defaultGuests || 2);
  const [mealPlan, setMealPlan] = useState<MealPlanId>('breakfast_kahwa');

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'pay_at_hotel' | 'instant_digital'>('pay_at_hotel');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedRoomId) {
      setRoomId(preselectedRoomId);
    }
  }, [preselectedRoomId]);

  useEffect(() => {
    if (defaultCheckIn) setCheckIn(defaultCheckIn);
    if (defaultCheckOut) setCheckOut(defaultCheckOut);
    if (defaultGuests) setGuests(defaultGuests);
  }, [defaultCheckIn, defaultCheckOut, defaultGuests]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];
  const nights = calculateNights(checkIn, checkOut);
  const totals = calculateBookingTotals(selectedRoom.pricePerNight, nights, mealPlan, guests);

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!isValidDateRange(checkIn, checkOut)) {
      setFormError('Please select a valid check-out date that comes after the check-in date.');
      return;
    }

    if (!guestName.trim() || !guestPhone.trim()) {
      setFormError('Please enter your full name and valid contact phone number.');
      return;
    }

    const reference = generateBookingReference();
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      reference,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim() || HOTEL_INFO.email,
      guestPhone: guestPhone.trim(),
      checkIn,
      checkOut,
      nights,
      guestsCount: guests,
      roomTypeId: selectedRoom.id,
      roomName: selectedRoom.name,
      mealPlan,
      mealPlanName: MEAL_PLAN_RATES[mealPlan].name,
      baseAmount: totals.baseAmount,
      mealAmount: totals.mealAmount,
      taxAmount: totals.taxAmount,
      totalAmount: totals.totalAmount,
      status: 'confirmed',
      paymentStatus: paymentChoice === 'instant_digital' ? 'paid' : 'pay_at_hotel',
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toISOString(),
      notes: 'Direct online booking via official Pahadon Ka Ghar portal.',
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    if (!confirmedBooking) return;
    const msg = `Hi Pahadon Ka Ghar Team, I have booked room ${confirmedBooking.roomName} (Ref: ${confirmedBooking.reference}) for ${confirmedBooking.checkIn} to ${confirmedBooking.checkOut} for ${confirmedBooking.guestsCount} guests. Looking forward to our stay in Kashmir!`;
    const url = `https://wa.me/919469919558?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-stone-200 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-700/30 border border-amber-600/40 flex items-center justify-center text-amber-400">
              <BedDouble className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-stone-100 font-serif">
                {confirmedBooking ? 'Reservation Confirmed' : 'Reserve Your Stay at Pahadon Ka Ghar'}
              </h3>
              <p className="text-xs text-stone-400">
                Hariganiwan, Old Sonamarg Road · Direct Booking Best Rate Guarantee
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {confirmedBooking ? (
            /* Confirmation Voucher View */
            <div className="space-y-6">
              <div className="text-center py-4 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-xl font-bold text-stone-900 font-serif">
                  Reservation Successfully Confirmed!
                </h4>
                <p className="text-sm text-stone-600 mt-1">
                  Thank you, <span className="font-semibold text-stone-900">{confirmedBooking.guestName}</span>. Your stay at Pahadon Ka Ghar is secured.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-emerald-300 shadow-xs">
                  <span className="text-xs text-stone-500 font-medium">Booking Reference:</span>
                  <span className="text-base font-bold text-amber-800 font-mono tracking-wider">
                    {confirmedBooking.reference}
                  </span>
                </div>
              </div>

              {/* Voucher Card for Display & Printing */}
              <div className="border border-stone-200 rounded-xl p-5 bg-stone-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <h5 className="font-bold text-stone-900">{confirmedBooking.roomName}</h5>
                    <p className="text-xs text-stone-500">
                      {confirmedBooking.guestsCount} Guests · {confirmedBooking.nights} Night{confirmedBooking.nights > 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                    {confirmedBooking.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Check-In</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.checkIn}</span>
                    <span className="text-[10px] text-stone-500 block">From 12:00 PM</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Check-Out</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.checkOut}</span>
                    <span className="text-[10px] text-stone-500 block">Until 11:00 AM</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Meal Inclusions</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.mealPlanName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Total Tariff</span>
                    <span className="font-bold text-stone-900 text-sm font-mono">
                      {formatINR(confirmedBooking.totalAmount)}
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      {confirmedBooking.paymentStatus === 'paid' ? 'Paid Online' : 'Pay at Check-In'}
                    </span>
                  </div>
                </div>

                {confirmedBooking.specialRequests && (
                  <div className="text-xs text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200">
                    <span className="font-semibold text-stone-800">Special Requests: </span>
                    {confirmedBooking.specialRequests}
                  </div>
                )}

                <div className="pt-2 text-xs text-stone-500 flex items-center justify-between">
                  <span>Contact: {HOTEL_INFO.phone1} / {HOTEL_INFO.phone2}</span>
                  <span>Hariganiwan, Old Sonamarg Road</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Voucher</span>
                  </button>
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Hotel</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onGoToManagement(confirmedBooking.reference);
                    }}
                    className="px-4 py-2 text-xs font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Manage Booking in Desk
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Booking Entry Form */
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              {formError && (
                <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-200">
                  {formError}
                </div>
              )}

              {/* 1. Room Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  1. Select Room or Suite
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROOMS_DATA.map((room) => {
                    const isSelected = room.id === roomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setRoomId(room.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex gap-3 ${
                          isSelected
                            ? 'bg-amber-50/60 border-amber-700 ring-2 ring-amber-700/20'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <img
                          src={room.image}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="w-18 h-18 rounded-lg object-cover shrink-0 bg-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-stone-900 truncate">
                            {room.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {room.subtitle}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-bold text-amber-900 font-mono">
                              {formatINR(room.pricePerNight)}
                              <span className="text-[10px] font-normal text-stone-500">/night</span>
                            </span>
                            <span className="text-[11px] text-stone-600">
                              Up to {room.capacityAdults} Guests
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Dates & Guests Grid */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  2. Stay Dates & Party Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="block text-xs text-stone-600 mb-1">Check-In Date</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 font-medium focus:ring-2 focus:ring-amber-700 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs text-stone-600 mb-1">Check-Out Date</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 font-medium focus:ring-2 focus:ring-amber-700 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs text-stone-600 mb-1">Guests</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 font-medium focus:ring-2 focus:ring-amber-700 outline-none cursor-pointer"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5 Guests</option>
                        <option value={6}>6+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-stone-500 flex items-center gap-2">
                  <span className="font-semibold text-stone-700">{nights} Night{nights > 1 ? 's' : ''} Stay</span>
                  <span>·</span>
                  <span>Check-in 12:00 PM · Check-out 11:00 AM</span>
                </div>
              </div>

              {/* 3. Meal Plan Options */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  3. Kashmiri Dining & Meal Plan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(MEAL_PLAN_RATES) as MealPlanId[]).map((planKey) => {
                    const plan = MEAL_PLAN_RATES[planKey];
                    const isSelected = mealPlan === planKey;
                    return (
                      <div
                        key={planKey}
                        onClick={() => setMealPlan(planKey)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50/70 border-amber-700 ring-1 ring-amber-700/30'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-semibold text-xs text-stone-900 block">
                              {plan.name}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {planKey === 'none'
                                ? 'Pay for meals as ordered'
                                : planKey === 'breakfast_kahwa'
                                ? 'Morning saffron Kahwa + freshly baked bread & breakfast'
                                : planKey === 'wazwan_half_board'
                                ? 'Breakfast + Authentic Kashmiri Wazwan evening dinner'
                                : 'All 3 meals + afternoon tea in garden'}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-amber-800 font-mono shrink-0 ml-2">
                            {plan.rate === 0 ? 'Free' : `+${formatINR(plan.rate)}/day`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Guest Details Form */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  4. Lead Guest Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="block text-xs text-stone-600 mb-1">Full Name *</span>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 focus:ring-2 focus:ring-amber-700 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-600 mb-1">Contact Phone *</span>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 focus:ring-2 focus:ring-amber-700 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-600 mb-1">Email Address</span>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 focus:ring-2 focus:ring-amber-700 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <span className="block text-xs text-stone-600 mb-1">Special Requests or Transport Needs (Optional)</span>
                  <input
                    type="text"
                    placeholder="e.g. Need airport taxi pickup from Srinagar / Extra electric blanket / Vegetarian meals only"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 focus:ring-2 focus:ring-amber-700 outline-none"
                  />
                </div>
              </div>

              {/* 5. Payment Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  5. Payment Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentChoice('pay_at_hotel')}
                    className={`p-3 rounded-xl border cursor-pointer ${
                      paymentChoice === 'pay_at_hotel'
                        ? 'bg-amber-50 border-amber-700 ring-1 ring-amber-700/20'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <span className="font-semibold text-xs text-stone-900 block">
                      Pay at Check-In (Cash / UPI at Hotel)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Book now with zero advance prepayment required.
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentChoice('instant_digital')}
                    className={`p-3 rounded-xl border cursor-pointer ${
                      paymentChoice === 'instant_digital'
                        ? 'bg-amber-50 border-amber-700 ring-1 ring-amber-700/20'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <span className="font-semibold text-xs text-stone-900 block">
                      Instant Digital Payment (UPI / Card / NetBanking)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Pre-authorized instant confirmation with priority check-in.
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Summary Breakdown */}
              <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 space-y-2">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Room Tariff ({nights} night{nights > 1 ? 's' : ''} × {formatINR(selectedRoom.pricePerNight)})</span>
                  <span className="font-mono font-medium">{formatINR(totals.baseAmount)}</span>
                </div>
                {totals.mealAmount > 0 && (
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Dining Plan ({guests} guests × {nights} nights)</span>
                    <span className="font-mono font-medium">{formatINR(totals.mealAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-stone-600">
                  <span>GST & Service Charge (12%)</span>
                  <span className="font-mono font-medium">{formatINR(totals.taxAmount)}</span>
                </div>
                <div className="border-t border-stone-300 pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-stone-900 text-sm">Total Payable</span>
                    <span className="text-[11px] text-stone-500 block">All taxes & services included</span>
                  </div>
                  <span className="text-xl font-bold text-amber-900 font-mono">
                    {formatINR(totals.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Direct Booking Assurance */}
              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Free cancellation up to 48 hours prior to check-in. Instant reservation notification sent to front desk.
                </span>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Reservation ({formatINR(totals.totalAmount)})</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
