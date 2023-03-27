package com.example.kintaiapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.kintaiapp.model.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    // アカウントSQL
    // ユーザー情報取得
    String sql1 = "SELECT"
            + " *"
            + " FROM"
            + " public.account"
            + " WHERE"
            + " id = :userid";

    @Query(value = sql1, nativeQuery = true)
    public Optional<Account> findAccountByUserId(
            @Param("userid") String userid);
}
