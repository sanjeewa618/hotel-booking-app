package com.auroradev.AuroraHotel.service.interfac;

import com.auroradev.AuroraHotel.dto.LoginRequest;
import com.auroradev.AuroraHotel.dto.Response;
import com.auroradev.AuroraHotel.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
