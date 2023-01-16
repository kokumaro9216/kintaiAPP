package com.example.kintaiapp.service;

import java.util.Collections;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.kintaiapp.repository.UserInfoRepository;
import com.example.kintaiapp.model.entity.UserInfo;
import com.example.kintaiapp.security.AccountUserDetails;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AccountUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(AccountUserDetailsService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // DBからユーザ情報を取得し、ユーザ情報と権限情報をセットする
        // UserInfo userInfo =
        // Optional.ofNullable(UserInforepository.findByUserId(username))
        // .orElseThrow(() -> new UsernameNotFoundException("ユーザが見つかりません")).get(0);
        // return new AccountUserDetails(userInfo, getAuthorities(userInfo));

        if (username == null) {
            throw new UsernameNotFoundException("empty");
        }

        // 本来ならDBアクセスしてパスワードを取得するところだが、サンプルなのでプログラム直書き
        UserInfo userInfo;
        String password;
        switch (username) {
            case "login":

                userInfo = Optional.ofNullable(UserInfoRepository.findByUserId(username))
                        .orElseThrow(() -> new UsernameNotFoundException("ユーザが見つかりません")).get(0);

                password = "password"; // パスワードは「password」
                UserInfo.setAccountID(username);
                UserInfo.setPassword(password);

                break;
            default:
                throw new UsernameNotFoundException("not found");
        }

        logger.info(username);
        logger.info(password);

        return new AccountUserDetails(userInfo, getAuthorities(userInfo));

    }

    private Collection<GrantedAuthority> getAuthorities(UserInfo userInfo) {
        // Admin権限があるか判別し、権限情報を返却する
        // ※使うかわからない
        // if (userInfo.isAdmin()) {
        // return AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
        // } else {
        // return AuthorityUtils.createAuthorityList("ROLE_USER");
        // }
        return AuthorityUtils.createAuthorityList("ROLE_USER");
    }

}