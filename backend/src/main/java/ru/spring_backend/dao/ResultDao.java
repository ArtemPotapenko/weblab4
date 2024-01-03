package ru.spring_backend.dao;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.spring_backend.dto.Result;
import ru.spring_backend.dto.UserDto;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResultDao extends JpaRepository<Result,Long> {
    Optional<Result> getResultById(Long id);
    Optional<Result> getResultsByDateOrTime(Date date, Double time);
    @Override
    List<Result> findAll();
    List<Result> getResultsByUserIs(UserDto user);
    @Query("update Result r set r.time =?2 where r.id =?1")
    @Modifying
    @Transactional
    int updateTime(Long id, Double time);
}
