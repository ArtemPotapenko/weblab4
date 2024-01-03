package ru.spring_backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.spring_backend.dto.UserDto;
import ru.spring_backend.dto.UserToken;
import ru.spring_backend.requests.LoginRequest;
import ru.spring_backend.requests.RegistrationRequest;
import ru.spring_backend.security.JWTUtils;
import ru.spring_backend.services.UserService;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JWTUtils jwtUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @SneakyThrows
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginRequest loginRequest){
        try{
            UserDetails user = userService.findUserByUsername(loginRequest.getLogin());
            System.out.println();
            if (bCryptPasswordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
                return ResponseEntity.ok(new UserToken(jwtUtils.generateJwtToken(user.getUsername())));
            }
            else{
                return ResponseEntity.badRequest().body("Неправильный логин или пароль");
            }

        }
        catch (UsernameNotFoundException e){
            return ResponseEntity.badRequest().body("Пользователь %s не зарегистрирован".formatted(loginRequest.getLogin()));
        }

    }
    @PostMapping("/auth/reg")
    public ResponseEntity<?> registration(@RequestBody @Validated RegistrationRequest registrationRequest){
        try{
            userService.findUserByUsername(registrationRequest.getLogin());
            return ResponseEntity.badRequest().body("Пользователь с таким логином уже зарегистрирован.");
        }
        catch (UsernameNotFoundException e){
            if (registrationRequest.getPassword().equals(registrationRequest.getRepeatPassword())){

                UserDto userDto = new UserDto();
                userDto.setLogin(registrationRequest.getLogin());
                userDto.setPassword(bCryptPasswordEncoder.encode(registrationRequest.getPassword()));

                userService.saveUser(userDto);
                return ResponseEntity.ok(new UserToken(jwtUtils.generateJwtToken(userDto.getLogin())));
            }
            else return ResponseEntity.badRequest().body("Пароли не совпадают");
        }
    }
    @GetMapping("/auth")
    public ResponseEntity<?> getLogPage(){
        return ResponseEntity.ok().build();
    }

}
