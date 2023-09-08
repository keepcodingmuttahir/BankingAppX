package com.redmath.bankingapp.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository < User, Long > {

    //@Query("select u from User u where u.userName = ?1")
//    @Query(value = "SELECT * FROM users ", nativeQuery = true)
//     List<User> findAll(String userName);
//    @Query(value = "SELECT * FROM users WHERE user_name = ?", nativeQuery = true)
//    User findByUserName(String userName);
     User findByUserName (String username);

    List<User> findAllByUserName(String title);

    @Query(value = "SELECT roles FROM users where user_name = ?1", nativeQuery = true)
    String getRolesByUsername(String username);

    @Query(value = "SELECT id FROM users where user_name = ?1", nativeQuery = true)
    Long findIdByUsername(String name);
}
