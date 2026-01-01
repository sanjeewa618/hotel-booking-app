package com.auroradev.AuroraHotel.service.interfac;

import com.auroradev.AuroraHotel.dto.Response;
import com.auroradev.AuroraHotel.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}