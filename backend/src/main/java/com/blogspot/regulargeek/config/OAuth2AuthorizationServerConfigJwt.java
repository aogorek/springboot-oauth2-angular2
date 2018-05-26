package com.blogspot.regulargeek.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import javax.sql.DataSource;

@Configuration
@EnableAuthorizationServer
public class OAuth2AuthorizationServerConfigJwt extends AuthorizationServerConfigurerAdapter {

    @Autowired
    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager;

    @Autowired
    ClientDetailsService clientDetailsService;

    @Autowired
    DataSource dataSource;

    @Value("${app.redirectUriList}")
    private String redirectUriList;

    @Override
    public void configure(final AuthorizationServerSecurityConfigurer oauthServer){
        oauthServer.tokenKeyAccess("permitAll()").allowFormAuthenticationForClients();
        oauthServer.passwordEncoder(noOpEncoder());
    }

    @Bean
    public PasswordEncoder noOpEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    public void configure(final ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
            .withClient("sampleClientId")
            .redirectUris(redirectUriList.split(","))
            .authorizedGrantTypes("implicit")
            .scopes("read", "write", "foo", "bar")
            .autoApprove(true)
            .accessTokenValiditySeconds(2500);
    }

    @Bean
    @Primary
    public DefaultTokenServices tokenServices() {
        final DefaultTokenServices defaultTokenServices = new CustomTokenServices(tokenStore());
        defaultTokenServices.setSupportRefreshToken(true);
        defaultTokenServices.setClientDetailsService(clientDetailsService);
        return defaultTokenServices;
    }

    @Override
    public void configure(final AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        final TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        endpoints.tokenStore(tokenStore())
            .tokenEnhancer(tokenEnhancerChain)
            .tokenServices(tokenServices())
            .authenticationManager(authenticationManager);
    }

    @Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(dataSource);
    }
}
