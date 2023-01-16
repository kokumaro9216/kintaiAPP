package com.example.kintaiapp.model.entity;

public class UserInfo {
    private static String AccountID;
    private static String Password;
    private boolean Admin;
    private boolean enabled;
    private boolean accountNonExpired;
    private boolean credentialsNonExpired;
    private boolean accountNonLocked;

    public UserInfo() {
    }

    public String getAccountID() {
        return UserInfo.AccountID;
    }

    public static void setAccountID(String accountID) {
        AccountID = accountID;
    }

    public String getPassword() {
        return UserInfo.Password;
    }

    public static void setPassword(String password) {
        Password = password;
    }

    public boolean isAdmin() {
        return Admin;
    }

}
