package com.redmath.bankingapp.transaction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface TransactionRepository extends JpaRepository < Transaction, Long> {

      @Query(value = "SELECT * FROM transaction WHERE user_id = ?", nativeQuery = true)
      List<Transaction> findByUser_Id(Long user_id);

      @Transactional
      @Modifying
      @Query(value = "DELETE FROM transaction WHERE user_id = ?1", nativeQuery = true)
      int deleteByUserId(long user_id);

}
