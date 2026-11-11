import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HomeOverview } from './components/HomeOverview.tsx';
import { RoomsView } from './components/RoomsView.tsx';
import { DiningView } from './components/DiningView.tsx';
import { AttractionsView } from './components/AttractionsView.tsx';
import { SkillAcademyView } from './components/SkillAcademyView.tsx';
import { BookingManagementView } from './components/BookingManagementView.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { Footer } from './components/Footer.tsx';
import { INITIAL_BOOKINGS, HOTEL_INFO } from './data/hotelData.ts';
import { Booking, BookingStatus, RoomCategory } from './types/hotel.ts';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  // Navigation tab state (supports URL hash e.g. #rooms, #management)
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'rooms', 'dining', 'attractions', 'academy', 'management'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  // Sync tab with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'rooms', 'dining', 'attractions', 'academy', 'management'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shared booking search criteria
  const today = new Date().toISOString().split('T')[0];
  const defaultNext = new Date();
  defaultNext.setDate(defaultNext.getDate() + 2);
  const nextDateStr = defaultNext.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(nextDateStr);
  const [guests, setGuests] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>('all');

  // Bookings state persisted in localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('pkg_hotel_reservations');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_BOOKINGS;
  });

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    try {
      localStorage.setItem('pkg_hotel_reservations', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalPreselectedRoomId, setModalPreselectedRoomId] = useState<string | undefined>();
  const [lookupTargetRef, setLookupTargetRef] = useState<string>('');

  const handleOpenBookingModal = (roomTypeId?: string) => {
    setModalPreselectedRoomId(roomTypeId);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
    saveBookings(updated);
  };

  const handleAssignRoomNumber = (bookingId: string, roomNumber: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, roomNumber: roomNumber.trim() } : b
    );
    saveBookings(updated);
  };

  const handleAddNote = (bookingId: string, note: string) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, notes: note.trim() } : b));
    saveBookings(updated);
  };

  const handleGoToManagement = (bookingRef?: string) => {
    if (bookingRef) {
      setLookupTargetRef(bookingRef);
    }
    changeTab('management');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeOverview
            onOpenBookingModal={handleOpenBookingModal}
            onNavigateToRooms={() => changeTab('rooms')}
            onNavigateToDining={() => changeTab('dining')}
            onNavigateToAttractions={() => changeTab('attractions')}
            onNavigateToAcademy={() => changeTab('academy')}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'rooms' && (
          <RoomsView
            onSelectRoomForBooking={(roomId) => handleOpenBookingModal(roomId)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'dining' && <DiningView />}

        {activeTab === 'attractions' && <AttractionsView />}

        {activeTab === 'academy' && <SkillAcademyView />}

        {activeTab === 'management' && (
          <BookingManagementView
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onAssignRoomNumber={handleAssignRoomNumber}
            onAddNote={handleAddNote}
            onOpenNewBookingModal={() => handleOpenBookingModal()}
            initialLookupRef={lookupTargetRef}
          />
        )}
      </main>

      {/* Floating Action Button for WhatsApp / Dial */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2 no-print">
        <a
          href="https://wa.me/919469919558?text=Hello%20Pahadon%20Ka%20Ghar%20Team,%20I%20am%20inquiring%20about%20room%20availability%20in%20Kashmir."
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
          aria-label="Direct WhatsApp Concierge"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedRoomId={modalPreselectedRoomId}
        defaultCheckIn={checkIn}
        defaultCheckOut={checkOut}
        defaultGuests={guests}
        onBookingConfirmed={handleBookingConfirmed}
        onGoToManagement={handleGoToManagement}
      />

      {/* Global Footer */}
      <Footer setActiveTab={changeTab} onOpenBookingModal={() => handleOpenBookingModal()} />
    </div>
  );
}
