package com.example.kintaiapp.repository;

import com.example.kintaiapp.model.entity.UserInfo;

public class UserInfoRepository {

    public static UserInfo findByUserId(String username) {
        UserInfo UserInfo;
        return UserInfo;
    }

    // よくわからんけど@Autowired使ってDBのデータ持ってくるらしい
    // 現状ログインはべた書きしてる
}
