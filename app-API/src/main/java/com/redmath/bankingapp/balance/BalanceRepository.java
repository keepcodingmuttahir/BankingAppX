package com.redmath.bankingapp.balance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface BalanceRepository extends JpaRepository < Balance, Long >{

    @Transactional
    @Modifying
    @Query(value = "UPDATE balance SET Amount = ?1, debit = ?2 WHERE id = ?3", nativeQuery = true)
    int updatenewDebitBalance(String balance,String debit, Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE balance SET Amount = ?1, credit = ?2 WHERE id = ?3", nativeQuery = true)
    int updatenewCreditBalance(String balance,String credit, Long id);

       @Transactional
        @Modifying
        @Query(value = "INSERT INTO balance (id, Amount, debit, credit, date) VALUES (?1, '1000', '0', '0', CURRENT_TIMESTAMP())", nativeQuery = true)
        int createById(Long userId);



}
