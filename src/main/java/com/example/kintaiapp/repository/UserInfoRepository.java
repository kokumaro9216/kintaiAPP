package com.example.kintaiapp.repository;

import com.example.kintaiapp.model.entity.UserInfo;
//import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository {

    /*
     * public static UserInfo findByUserId(String username) {
     * UserInfo UserInfo;
     * UserInfo = username;
     * return UserInfo;
     * }
     */

    // よくわからんけど@Autowired使ってDBのデータ持ってくるらしい
    // 現状ログインはべた書きしてる
}
