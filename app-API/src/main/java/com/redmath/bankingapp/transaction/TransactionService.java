package com.redmath.bankingapp.transaction;
import com.redmath.bankingapp.balance.Balance;
import com.redmath.bankingapp.balance.BalanceService;
import com.redmath.bankingapp.user.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository repository;
    private final BalanceService balanceService;
    private final UserService userService;

    public TransactionService(TransactionRepository repository, BalanceService balanceService, UserService userService) {
        this.repository = repository;
        this.balanceService = balanceService;
        this.userService = userService;
    }

    public List<Transaction> findAll() {
        return repository.findAll();
    }




    public Transaction create(Long userId, Transaction transaction)
    {
        transaction.setUser_id(userId);
        transaction.setDate(LocalDateTime.now());
        Balance balance = balanceService.findById(userId);
        long credit = Integer.parseInt(balance.getCredit());
        long debit = Integer.parseInt(balance.getDebit());
        long BalanceAmount = Integer.parseInt(balance.getAmount());
        if( transaction.getTransType().equals("debit") && BalanceAmount >= transaction.getAmount())
        {
            BalanceAmount = BalanceAmount - transaction.getAmount();
            debit = debit - transaction.getAmount();
            String newDebit = Integer.toString((int) debit);
            String newBalance = Integer.toString((int) BalanceAmount);
            balanceService.updateDebitBalance(newBalance,newDebit, balance.getId());
        } else if(transaction.getTransType().equals("credit"))
        {
            BalanceAmount = BalanceAmount + transaction.getAmount();
            credit = credit + transaction.getAmount();
            String newCredit = Integer.toString((int) credit);
            String newBalance = Integer.toString((int) BalanceAmount);
            balanceService.updateCreditBalance(newBalance,newCredit, balance.getId());
        }
        return repository.save(transaction);

    }

    public List<Transaction> findByUserId(Long userId) {
        return repository.findByUser_Id(userId);
    }

}
