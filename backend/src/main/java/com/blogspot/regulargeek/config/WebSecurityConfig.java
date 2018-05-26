package com.blogspot.regulargeek.config;

import com.blogspot.regulargeek.service.user.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService)
                .passwordEncoder(encoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

        @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/login").permitAll()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .loginPage("/login")
                .permitAll()
                .and().csrf().disable()
                .logout().permitAll();
    }

}
