package com.example.kintaiapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

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
                .defaultSuccessUrl("/input", true)
                .usernameParameter("userid")
                .passwordParameter("password")
                .failureUrl("/home?error")
                .permitAll())
                .logout(logout -> logout
                        .logoutSuccessUrl("/home"))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/","/home", "/account", "/account-entry.html").permitAll()
                        .requestMatchers("/css/**", "/js/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                		.loginPage("/home")
                		.defaultSuccessUrl("/input", true)
                		.permitAll()
                		);
        return http.build();
    }
}