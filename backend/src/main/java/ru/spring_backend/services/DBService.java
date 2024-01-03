package ru.spring_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.spring_backend.dao.ResultDao;
import ru.spring_backend.dao.UserDao;
import ru.spring_backend.dto.Result;
import ru.spring_backend.dto.UserDto;
import ru.spring_backend.security.User;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DBService {
    private final ResultDao resultDao;
    private final UserDao userDao;
    public List<Result> getResults(String username)
    {   UserDto userDto = userDao.findByLogin(username).orElseThrow();
        return resultDao.getResultsByUserIs(userDto);
    }
    public UserDto saveUser(User user){
        UserDto userDto = new UserDto();
        userDto.setLogin(user.getUsername());
        userDto.setLogin(user.getPassword());
        return userDao.findByLogin(userDto.getLogin()).orElseGet(()->userDao.save(userDto));
    }
    public Result saveResult(Result result, String username){
        UserDto userDto = userDao.findByLogin(username).orElseThrow();
        result.setUser(userDto);
        result.setDate(new Date());
        return resultDao.save(result);
    }
    public void updateTime(Result result){
        resultDao.updateTime(result.getId(),result.getTime());
    }


}
