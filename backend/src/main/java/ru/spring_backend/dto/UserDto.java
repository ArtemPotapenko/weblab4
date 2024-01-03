package ru.spring_backend.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ru.spring_backend.security.User;

import java.util.List;

@Entity
@Table(name = "point_user")
@NoArgsConstructor
@Data
public class UserDto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String login;
    @Column(nullable = false)
    private String password;
    @OneToMany(targetEntity = Result.class)
    List<Result> results;


}
