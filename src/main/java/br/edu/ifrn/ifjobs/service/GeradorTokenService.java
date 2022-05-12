package br.edu.ifrn.ifjobs.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class GeradorTokenService {

    @Value("${spring.jwt.secret}")
    private static String SECRET_KEY_JWT;

    public static String geraToken(String email, int tempoExpiracao) {
        final String JWT = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + tempoExpiracao))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY_JWT).compact();

        return "Bearer " + JWT;
    }

}
