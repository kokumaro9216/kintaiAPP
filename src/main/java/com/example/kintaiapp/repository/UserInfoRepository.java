package com.example.kintaiapp.repository;

// TODO POM.xmlにspring-boot-starter-data-jpa（間違っているかも）をdependencyに追加すればインポートできるようになる
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
