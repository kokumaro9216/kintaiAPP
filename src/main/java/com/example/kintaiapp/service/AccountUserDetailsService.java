package com.example.kintaiapp.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.kintaiapp.repository.AccountRepository;
import com.example.kintaiapp.model.entity.Account;
import com.example.kintaiapp.model.entity.UserInfo;
import com.example.kintaiapp.security.AccountUserDetails;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AccountUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    private static final Logger logger = LoggerFactory.getLogger(AccountUserDetailsService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // id入力がされてない場合はエラー
        if (username == null) {
            throw new UsernameNotFoundException("empty");
        }

        // DBアクセスしてパスワードを取得する
        // loginのみ簡単にログインできるよう残している
        UserInfo userInfo = new UserInfo();
        Account account = new Account();
        String password;

        if (username == "login") {
            password = "password"; // パスワードは「password」
            userInfo.setAccountID(username);
            userInfo.setPassword(password);

        } else {
            account = Optional.ofNullable(accountRepository.findAccountByUserId(username).get())
                    .orElseThrow(() -> new UsernameNotFoundException("not found"));

            userInfo.setAccountID(username);
            userInfo.setPassword(account.getPassword());

        }

        logger.info(userInfo.getAccountID());
        logger.info(userInfo.getPassword());

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