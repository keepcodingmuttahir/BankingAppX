package com.redmath.bankingapp.transaction;

import com.redmath.bankingapp.balance.Balance;

import com.redmath.bankingapp.balance.BalanceService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository repository;
    private final BalanceService balanceService;

    public TransactionService(TransactionRepository repository, BalanceService balanceService) {
        this.repository = repository;
        this.balanceService = balanceService;

    }

    public List<Transaction> findAll() {
        return repository.findAll();
    }



    @PreAuthorize("hasAuthority(ADMIN")
    public Transaction create(Long userId, Transaction transaction)
    {
        transaction.setUser_id(userId);
        transaction.setDate(LocalDateTime.now());
//        long User_id = transaction.getUser_id();
        Balance balance = balanceService.findById(userId);
        long credit = Integer.parseInt(balance.getCredit());
        long debit = Integer.parseInt(balance.getDebit());
        long BalanceAmount = Integer.parseInt(balance.getAmount());
        //long TransactionAmount = transaction.getAmount();
        //transaction.getTransType().equals("debit") &&
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


//    public Transaction create(Long userId, Transaction transaction) {
//        transaction.setUser_id(userId); // Use setUserId instead of setUser_id
//        transaction.setDate(LocalDateTime.now());
//
//        Balance balance = balanceService.findById(userId);
//        long credit = Integer.parseInt(balance.getCredit());
//        long debit = Integer.parseInt(balance.getDebit());
//        long balanceAmount = Integer.parseInt(balance.getAmount());
//
//        // Check if transaction.getAmount() is not null before parsing
//        if (transaction.getAmount() != null) {
//            long transactionAmount = Integer.parseInt(transaction.getAmount());
//
//            if ("debit".equals(transaction.getTransType()) && balanceAmount >= transactionAmount) {
//                balanceAmount = balanceAmount - transactionAmount;
//                debit = debit - transactionAmount;
//                String newDebit = Integer.toString((int) debit);
//                String newBalance = Integer.toString((int) balanceAmount);
//                balanceService.updateDebitBalance(newBalance, newDebit, balance.getId());
//            } else if ("credit".equals(transaction.getTransType())) {
//                balanceAmount = balanceAmount + transactionAmount;
//                credit = credit + transactionAmount;
//                String newCredit = Integer.toString((int) credit);
//                String newBalance = Integer.toString((int) balanceAmount);
//                balanceService.updateCreditBalance(newBalance, newCredit, balance.getId());
//            }
//        }
//
//        return repository.save(transaction);
//    }


    public List<Transaction> findByUserId(Long userId) {
        return repository.findByUser_Id(userId);
    }

}
