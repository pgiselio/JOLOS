package br.edu.ifrn.ifjobs.service;

import br.edu.ifrn.ifjobs.security.RecaptchaResponse;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class RecaptchaService {

    @Value("${recaptcha.secret}")
    private String recaptchaSecret;

    private static final String VERIFY_URL =
            "https://www.google.com/recaptcha/api/siteverify";

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean isTokenValid(String token, String userIp) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", recaptchaSecret);
        params.add("response", token);

        if (userIp != null) {
            params.add("remoteip", userIp);
        }

        ResponseEntity<RecaptchaResponse> response =
                restTemplate.postForEntity(VERIFY_URL, params, RecaptchaResponse.class);

        RecaptchaResponse body = response.getBody();

        if (body == null) return false;

        // v2: apenas success
        if (!body.isSuccess()) return false;

        // v3: valida score mínimo
        if (body.getScore() != 0) { // só existe no v3
            return body.getScore() >= 0.5; // você pode ajustar
        }

        return true;
    }
}