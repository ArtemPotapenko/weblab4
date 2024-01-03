package ru.spring_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.spring_backend.dto.Result;
import ru.spring_backend.requests.PointRequest;


@Service
@RequiredArgsConstructor
public class CheckPointService {
    public Result getResult(PointRequest pointRequest) {
        Result result = new Result();
        result.setX(pointRequest.getX());
        result.setY(pointRequest.getY());
        result.setR(pointRequest.getR());
        result.setHit(check(pointRequest.getX(), pointRequest.getY(), pointRequest.getR()));
        return result;
    }

    private boolean check(double x, double y, double r) {
        if (x >= 0 && y >= 0 && x+y <= r) return true;
        if (x>=0 && y<=0 && x <= r &&  y>=-r) return true;
        if (x<=0 && y>=0 && x*x+y*y <= r*r) return true;
        return false;
    }

}
