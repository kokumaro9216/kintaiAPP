package com.example.kintaiapp.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class MainController {
    @RequestMapping("/home")
    public String home() {
        return "home";
    }

    @RequestMapping("/login")
    public String login() {
        return "input";
    }

    @RequestMapping("/logout")
    public String logout() {
        return "home";
    }

    @RequestMapping("/input")
    public String input() {
        return "input";
    }

    @RequestMapping("/output")
    public String output() {
        return "output";
    }

    @RequestMapping("/account")
    public String account() {
        return "account-entry";
    }
    
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    public static void main(String[] args) {
        SpringApplication.run(MainController.class, args);
    }
    
 
}
