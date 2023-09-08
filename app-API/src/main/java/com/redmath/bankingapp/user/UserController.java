package com.redmath.bankingapp.user;
import com.redmath.bankingapp.balance.Balance;
import com.redmath.bankingapp.balance.BalanceService;
import com.redmath.bankingapp.transaction.Transaction;
import com.redmath.bankingapp.transaction.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/Users")
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT})  // <- use your url of frontend

public class UserController {
    private final UserService service;
    private final BalanceService balanceService;
    private final UserDetailsDTO userDetailsDTO;
    private final TransactionService transactionService;

    public UserController(UserService service, BalanceService balanceService, UserDetailsDTO userAccountDetails, TransactionService transactionService) {
        this.service = service;
        this.balanceService = balanceService;
        this.userDetailsDTO = userAccountDetails;
        this.transactionService = transactionService;
    }
        @GetMapping
        @PreAuthorize("hasAuthority('ADMIN')")
        public ResponseEntity<List<User>> findAll() {
            List<User> users = service.findAll();
            return ResponseEntity.ok(users);
        }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> create(@RequestBody User user) {

        User created = service.create(user);
        if (created != null) {
            if(user.getRoles().equals("USER")) {
                int balance = balanceService.createById(user.getId());
            }
            return ResponseEntity.ok(created);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Map<String, UserDetailsDTO>> UserDashboard(Authentication auth) {
        Long userId = service.findIdByUsername(auth.getName());
        User user= service.findById(userId);
        Balance balance=balanceService.findById(userId);
        List<Transaction> transaction =transactionService.findByUserId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userDetailsDTO.setUser(user);
        userDetailsDTO.setBalance(balance);
        userDetailsDTO.setTransactions(transaction);
        return ResponseEntity.ok(Map.of("content",userDetailsDTO));
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> findById(@PathVariable("id") Long id) {
        User user = service.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable("id") long id) {
        User user = service.findById(id);
        if (user==null) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> update(@PathVariable("id") long id,@RequestBody User user) {

        User up = service.update(user, id);
        if (up==null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(up);
    }

    @GetMapping("/getRoles")
    public String getRoles(Authentication auth){
        return service.getRolesByUsername(auth.getName());
    }


}
