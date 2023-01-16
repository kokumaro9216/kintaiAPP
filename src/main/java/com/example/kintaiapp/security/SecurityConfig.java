package com.example.kintaiapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity
@ComponentScan("com.example.kintaiapp.service")
public class SecurityConfig {

    @Autowired
    UserDetailsService userDetailsService;

    // ***パスワードエンコーダーを使う場合は①と②をコメントアウトする***
    // ①パスワードのエンコーダー
    // @Bean
    // public PasswordEncoder passwordEncoder() {
    // return new BCryptPasswordEncoder();
    // }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        // ***認証にUserDetailServiceを使う
        auth.userDetailsService(userDetailsService);
        // ②
        // auth.userDetailsService(userDetailsService);
        // .passwordEncoder(passwordEncoder());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.formLogin(login -> login
                .loginProcessingUrl("/login")
                .loginPage("/home")
                .defaultSuccessUrl("/input")
                .usernameParameter("userid")
                .passwordParameter("password")
                .failureUrl("/home?error")
                .permitAll())
                .logout(logout -> logout
                        .logoutSuccessUrl("/"))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/home", "/account").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }
}