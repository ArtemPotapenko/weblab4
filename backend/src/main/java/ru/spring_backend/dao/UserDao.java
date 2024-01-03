package ru.spring_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spring_backend.dto.UserDto;

import java.util.Optional;
@Repository
public interface UserDao extends JpaRepository<UserDto,Long> {
    @Override
    <S extends UserDto> S save(S entity);
    Optional<UserDto> findByLogin(String login);
}
