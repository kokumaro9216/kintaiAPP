package com.example.kintaiapp.security;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.example.kintaiapp.entity.UserInfo;

public class AccountUserDetails extends User {

    private UserInfo userInfo;

    public AccountUserDetails(UserInfo userInfo,
            Collection<? extends GrantedAuthority> authorities) {
        this(userInfo, true, true, true, true, authorities);
    }

    public AccountUserDetails(UserInfo userInfo, boolean enabled, boolean accountNonExpired,
            boolean credentialsNonExpired, boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities) { // パスワードの接頭辞に {noop} を付けることでパスワードエンコーダーを使わない
        // 場合のパスワードで認証できる
        super(userInfo.getAccountID(), "{noop}" + userInfo.getPassword(), true, true, true, true, authorities);
        this.userInfo = userInfo;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }
}
