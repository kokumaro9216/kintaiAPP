package com.example.kintaiapp.entity;

public class UserInfo {
    private String AccountID;
    private String Password;
    private boolean Admin;
    private boolean enabled;
    private boolean accountNonExpired;
    private boolean credentialsNonExpired;
    private boolean accountNonLocked;

    public String getAccountID() {
        return this.AccountID;
    }

    public void setAccountID(String AccountID) {
        this.AccountID = AccountID;
    }

    public String getPassword() {
        return this.Password;
    }

    public void setPassword(String Password) {
        this.Password = Password;
    }

    public boolean isAdmin() {
        return Admin;
    }

}
