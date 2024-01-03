package ru.spring_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.spring_backend.controllers.UserController;
import ru.spring_backend.convertors.UserConvertor;
import ru.spring_backend.dao.UserDao;
import ru.spring_backend.dto.UserDto;
import ru.spring_backend.security.User;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final UserConvertor userConvertor;
    public UserDetails findUserByUsername(String username){
        return userConvertor.toDetails(userDao.findByLogin(username).orElseThrow(()->new UsernameNotFoundException("User %s not found".formatted(username))));
    }
    public void saveUser(UserDto user){
        userDao.save(user);
    }
}
