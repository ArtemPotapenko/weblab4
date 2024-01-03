package ru.spring_backend.controllers;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.spring_backend.dto.Result;
import ru.spring_backend.requests.PointRequest;
import ru.spring_backend.security.JWTUtils;
import ru.spring_backend.services.CheckPointService;
import ru.spring_backend.services.DBService;
import ru.spring_backend.services.UserService;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class CheckController {
    private final CheckPointService checkPointService;
    private final DBService dbService;
    private static final Logger log = LoggerFactory.getLogger(CheckController.class);
    private final ObjectMapper mapper;
    @SneakyThrows
    @ResponseBody
    @PostMapping(value = "/point/check", produces = MediaType.APPLICATION_JSON_VALUE)
    public Result checkPoint(@RequestBody @Validated PointRequest pointRequest){
        long startTime = System.nanoTime();
        System.out.println(pointRequest);
        Result result = checkPointService.getResult(pointRequest);
        dbService.saveResult(result,SecurityContextHolder.getContext().getAuthentication().getName());
        result.setTime((System.nanoTime() - startTime)/1000000d);
        dbService.updateTime(result);
        log.debug("JSON : {}",mapper.writeValueAsString(result));
        return result;
    }
    @GetMapping(value = "/point/results", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Result> getResults(){
        return dbService.getResults(SecurityContextHolder.getContext().getAuthentication().getName());
    }
    @GetMapping("/point")
    public ResponseEntity<?> getPointPage(){
        System.out.println(1);
        return ResponseEntity.ok().build();
    }
}
