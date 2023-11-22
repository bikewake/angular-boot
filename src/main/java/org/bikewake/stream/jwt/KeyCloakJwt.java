package org.bikewake.stream.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collection;

public class KeyCloakJwt extends JwtAuthenticationToken {

    private String firstname;

    private String lastname;

    public KeyCloakJwt(Jwt jwt, Collection<? extends GrantedAuthority> authorities) {
        super(jwt, authorities);
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
