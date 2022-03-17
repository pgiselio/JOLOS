package br.edu.ifrn.ifjobs.core;

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
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import br.edu.ifrn.ifjobs.service.ImplementacaoUserDatailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

        @Autowired
        private ImplementacaoUserDatailsService implementacaoUserDatailsService;

        @Override
        protected void configure(HttpSecurity security) throws Exception {
                security.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()).and()
                                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                                .disable().authorizeRequests()
                                .antMatchers("/").permitAll().and().authorizeRequests().antMatchers("/usuario/create")
                                .permitAll()
                                .anyRequest().authenticated().and().logout().logoutSuccessUrl("/entrar")
                                .logoutRequestMatcher(new AntPathRequestMatcher("/saida"))
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
                web.ignoring().antMatchers("/**.html", "/webjars/**", "/configuration/**");
        }
}
