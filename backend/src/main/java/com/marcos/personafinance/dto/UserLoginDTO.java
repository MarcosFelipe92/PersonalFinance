package com.marcos.personafinance.dto;

import lombok.Getter;

@Getter
public class UserLoginDTO {
    private String login;
    private String password;

    public UserLoginDTO() {

    }

    public UserLoginDTO(String email, String password) {
        this.login = email;
        this.password = password;
    }
}
