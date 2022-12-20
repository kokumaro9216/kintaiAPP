package com.example.kintaiapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/logout")
    public String logout() {
        return "logout";
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
        return "account";
    }
}
