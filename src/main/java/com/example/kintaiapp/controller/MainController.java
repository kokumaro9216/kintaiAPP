package com.example.kintaiapp.controller;

import java.net.URI;
import java.util.Map;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.RequestEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@Controller
public class MainController {
	/*@RequestMapping("/home")
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
	}*/


    private final RestOperations restOperations = new RestTemplate();

    private final OAuth2AuthorizedClientService authorizedClientService;

    // 認可済みのクライアント情報(クライアント情報、認可したリソースオーナ名、アクセストークンなど)は
    // OAuth2AuthorizedClientService経由で取得できる
    public MainController(OAuth2AuthorizedClientService authorizedClientService) {
      this.authorizedClientService = authorizedClientService;
    }

    @GetMapping("/")
    public String index(OAuth2AuthenticationToken authentication, Model model) {
      // 画面に表示するために、OAuth2AuthorizedClientService経由で認可済みのクライアント情報を取得しModelに格納
      model.addAttribute("authorizedClient", this.getAuthorizedClient(authentication));
      return "index";
    }

    @GetMapping("/attributes")
    public String userAttributeAtLogin(@AuthenticationPrincipal OAuth2User oauth2User, Model model) {
      // 認証が制した時点のユーザ属性であれば、プロバイダに問い合わせなくても認証情報から取得できる。
      // 注：あくまで認証時点での情報なので、情報は古くなっている可能性がある
      model.addAttribute("attributes", oauth2User.getAttributes());
      return "userinfo";
    }

    @GetMapping("/attributes/latest")
    public String userLatestAttribute(OAuth2AuthenticationToken authentication, Model model) {
      // 最新のユーザ属性が必要な場合は、認証時に取得したアクセストークンを付与してプロバイダから再取得する
      // ここでは、Spring Framework提供のRestTemplateを使用してユーザ属性の取得を行っている。
      // ちなみに・・・Spring Securityのデフォルト実装では、「Nimbus OAuth 2.0 SDK」を使用してアクセストークン及びユーザ属性の取得を行っている。
      OAuth2AuthorizedClient authorizedClient = this.getAuthorizedClient(authentication);
      String userInfoUri = authorizedClient.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri();
      RequestEntity<Void> requestEntity = RequestEntity.get(URI.create(userInfoUri))
          .header(HttpHeaders.AUTHORIZATION, "Bearer " + authorizedClient.getAccessToken().getTokenValue())
          .build();
      model.addAttribute("attributes", restOperations.exchange(requestEntity, Map.class).getBody());
      return "userinfo";
    }

    private OAuth2AuthorizedClient getAuthorizedClient(OAuth2AuthenticationToken authentication) {
      return this.authorizedClientService.loadAuthorizedClient(
          authentication.getAuthorizedClientRegistrationId(), authentication.getName());
    }

 
}
