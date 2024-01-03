package ru.spring_backend.requests;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String login;
    private String password;
    private String repeatPassword;
}
