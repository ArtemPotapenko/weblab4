package ru.spring_backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointRequest {
    private double x;
    private double y;
    private double r;

}
