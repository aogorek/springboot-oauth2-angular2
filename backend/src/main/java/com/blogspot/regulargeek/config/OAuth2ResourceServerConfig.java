package com.blogspot.regulargeek.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

@EnableResourceServer
@Configuration
public class OAuth2ResourceServerConfig extends ResourceServerConfigurerAdapter {

    private static final String RESOURCE_ID = "resource_id";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.resourceId(RESOURCE_ID).stateless(false);
    }
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.requestMatchers()
                .requestMatchers(
                        new NegatedRequestMatcher(
                                new OrRequestMatcher(
                                        new AntPathRequestMatcher("/login"),
                                        new AntPathRequestMatcher("/logout"),
                                        new AntPathRequestMatcher("/images/**"),
                                        new AntPathRequestMatcher("/"),
                                        new AntPathRequestMatcher("/*.js"),
                                        new AntPathRequestMatcher("/*.ico"),
                                        new AntPathRequestMatcher("/*.css"),
                                        new AntPathRequestMatcher("/*.png"),
                                        new AntPathRequestMatcher("/*.html"),
                                        new AntPathRequestMatcher("/oauth/authorize"),
                                        new AntPathRequestMatcher("/oauth/confirm_access")
                                )
                        )
                )
                .and()
                .authorizeRequests().anyRequest().authenticated();
    }

}
