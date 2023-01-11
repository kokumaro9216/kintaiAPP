package com.example.kintaiapp.dao;

import java.util.List;
import com.example.kintaiapp.entity.UserInfo;

public interface UserInfoDao {
    List<UserInfo> findByUserId(String username);

}
