package com.redmath.bankingapp.transaction;
import com.redmath.bankingapp.balance.BalanceService;
import com.redmath.bankingapp.user.User;
import com.redmath.bankingapp.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT})  // <- use your url of frontend

@RequestMapping("/api/v1/Transaction")
public class TransactionController {
    private final TransactionService service;
    private final UserService userService;

    public TransactionController(TransactionService service, BalanceService balanceService, UserService userService) {
        this.service = service;
        //this.balanceService = balanceService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }


    @PostMapping("/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Transaction> create(@PathVariable Long userId, @RequestBody Transaction transaction, Authentication auth) {
        User user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        else if(user.getRoles().equals("ADMIN"))
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        else
        {
            Transaction created = service.create(userId, transaction);
            if (created != null) {
                return ResponseEntity.ok(created);
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
