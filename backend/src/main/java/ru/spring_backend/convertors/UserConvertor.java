package ru.spring_backend.convertors;

import org.springframework.stereotype.Component;
import ru.spring_backend.dao.UserDao;
import ru.spring_backend.dto.UserDto;
import ru.spring_backend.security.User;

import java.util.List;

@Component
public class UserConvertor {
    public User toDetails(UserDto userDto){
        User user = new User();
        user.setPassword(userDto.getPassword());
        user.setUsername(userDto.getLogin());
        user.setAuthorities(List.of());
        return user;
    }
    public UserDto toDto(User user){
        UserDto userDto = new UserDto();
        userDto.setLogin(user.getUsername());
        userDto.setPassword(user.getPassword());
        return userDto;
    }
}
