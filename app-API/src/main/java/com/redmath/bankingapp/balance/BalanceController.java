package com.redmath.bankingapp.balance;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Balance")
@CrossOrigin("https://localhost:3000")
public class BalanceController {
    private final BalanceService service;
    public BalanceController(BalanceService service)
    {
        this.service=service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Balance>> findAll()
    {
        return  ResponseEntity.ok(service.findAll());
    }

}
