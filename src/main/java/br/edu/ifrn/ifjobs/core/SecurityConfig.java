package br.edu.ifrn.ifjobs.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;

import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;
import br.edu.ifrn.ifjobs.service.ImplementacaoUserDatailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

        @Autowired
        private ImplementacaoUserDatailsService implementacaoUserDatailsService;

        @Override
        protected void configure(HttpSecurity security) throws Exception {
                security.cors().configurationSource(request -> {
                        CorsConfiguration cors = new CorsConfiguration();
                        cors.setAllowedOrigins(List.of("https://ifjobs.vercel.app"));
                        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
                        cors.setAllowedHeaders(List.of("*"));
                        return cors;
                }).and()
                                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                                .disable().authorizeRequests()
                                .antMatchers("/").permitAll()
                                .and()
                                .authorizeRequests().antMatchers("/api-docs").permitAll()
                                .and()
                                .authorizeRequests().antMatchers("/usuario/create").permitAll()
                                .and()
                                .authorizeRequests().antMatchers("/aluno/**")
                                .hasAnyAuthority(TipoUsuario.ALUNO.toString(), TipoUsuario.ADMIN.toString())
                                .and()
                                .authorizeRequests().antMatchers("/empresa/**")
                                .hasAnyAuthority(TipoUsuario.EMPRESA.toString(), TipoUsuario.ADMIN.toString())
                                .and()
                                .authorizeRequests().antMatchers("/vaga/create")
                                .hasAnyAuthority(TipoUsuario.EMPRESA.toString(), TipoUsuario.ADMIN.toString())
                                .anyRequest().authenticated()
                                .and().addFilterBefore(new JWTLoginFilter("/entrar", authenticationManager()),
                                                UsernamePasswordAuthenticationFilter.class)
                                .addFilterBefore(new JWTAPIAutenticacaoFilter(),
                                                UsernamePasswordAuthenticationFilter.class);
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(implementacaoUserDatailsService)
                                .passwordEncoder(new BCryptPasswordEncoder());
        }

        @Override
        public void configure(WebSecurity web) throws Exception {
                web.ignoring().antMatchers("/webjars/**", "/swagger-ui/**", "/api-docs/**", "/v3/**", "/h2-console/**");
        }
}
