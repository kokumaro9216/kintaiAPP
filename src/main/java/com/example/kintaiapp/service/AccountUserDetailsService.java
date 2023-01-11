package com.example.kintaiapp.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.kintaiapp.dao.UserInfoDao;
import com.example.kintaiapp.entity.UserInfo;
import com.example.kintaiapp.security.AccountUserDetails;

@Service
@ComponentScan("com.example.kintaiapp.dao")
public class AccountUserDetailsService implements UserDetailsService {

    // ユーザ情報を取得するために注入する
    @Autowired
    UserInfoDao userInfoDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // DBからユーザ情報を取得し、ユーザ情報と権限情報をセットする
        UserInfo userInfo = Optional.ofNullable(userInfoDao.findByUserId(username))
                .orElseThrow(() -> new UsernameNotFoundException("ユーザが見つかりません")).get(0);
        return new AccountUserDetails(userInfo, getAuthorities(userInfo));
    }

    private Collection<GrantedAuthority> getAuthorities(UserInfo userInfo) {
        // Admin権限があるか判別し、権限情報を返却する
        // ※使うかわからない
        if (userInfo.isAdmin()) {
            return AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
        } else {
            return AuthorityUtils.createAuthorityList("ROLE_USER");
        }
    }

}