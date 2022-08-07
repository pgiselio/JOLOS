package br.edu.ifrn.ifjobs.service;

import java.util.Date;

import io.jsonwebtoken.Jwts;

public class ValidadadorTokenService {
    
    private static String SECRET_KEY_JWT = "SEnHaDiFIciL1";

    public static boolean validaTempoExpiracao(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY_JWT)
                .parseClaimsJws(token.replace("Bearer ", "")).getBody().getExpiration().after(new Date());
    }

}
