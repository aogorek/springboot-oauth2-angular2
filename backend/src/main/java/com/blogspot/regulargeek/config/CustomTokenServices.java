package com.blogspot.regulargeek.config;

import jdk.nashorn.internal.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.ExpiringOAuth2RefreshToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Component
public class CustomTokenServices extends DefaultTokenServices {

    private TokenStore tokenStore;
    private TokenEnhancer accessTokenEnhancer;

    public CustomTokenServices(TokenStore tokenStore) {
        setTokenStore(tokenStore);

    }

    @Override
    public void setTokenStore(TokenStore tokenStore) {
        this.tokenStore = tokenStore;
        super.setTokenStore(tokenStore);
    }

    @Override
    public void setTokenEnhancer(TokenEnhancer accessTokenEnhancer) {
        this.accessTokenEnhancer = accessTokenEnhancer;
        super.setTokenEnhancer(accessTokenEnhancer);
    }

    @Override
    @Transactional
    public OAuth2AccessToken createAccessToken(OAuth2Authentication authentication) throws AuthenticationException {

        if (!hasPromptNoneParam(authentication)) {
            return super.createAccessToken(authentication);
        }


        OAuth2RefreshToken refreshToken = null;
        OAuth2AccessToken existingAccessToken = this.tokenStore.getAccessToken(authentication);
        if (existingAccessToken != null) {
            tokenStore.removeAccessToken(existingAccessToken);
        }
        OAuth2AccessToken accessToken = this.createAccessToken(authentication, refreshToken);
        this.tokenStore.storeAccessToken(accessToken, authentication);
        refreshToken = accessToken.getRefreshToken();
        if (refreshToken != null) {
            this.tokenStore.storeRefreshToken(refreshToken, authentication);
        }

        return accessToken;
    }

    private OAuth2AccessToken createAccessToken(OAuth2Authentication authentication, OAuth2RefreshToken refreshToken) {
        DefaultOAuth2AccessToken token = new DefaultOAuth2AccessToken(UUID.randomUUID().toString());
        int validitySeconds = this.getAccessTokenValiditySeconds(authentication.getOAuth2Request());
        if (validitySeconds > 0) {
            token.setExpiration(new Date(System.currentTimeMillis() + (long) validitySeconds * 1000L));
        }

        token.setRefreshToken(refreshToken);
        token.setScope(authentication.getOAuth2Request().getScope());
        return (this.accessTokenEnhancer != null ? this.accessTokenEnhancer.enhance(token, authentication) : token);
    }

    private boolean hasPromptNoneParam(OAuth2Authentication authentication) {
        return "none".equals(authentication.getOAuth2Request().getRequestParameters().get("prompt"));
    }

}
