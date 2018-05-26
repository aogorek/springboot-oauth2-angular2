package com.blogspot.regulargeek.dto;

import com.blogspot.regulargeek.model.User;
import org.springframework.util.CollectionUtils;

public class UserWebDTO {
    private Long id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String token;
    private String password;
    private RoleDTO role;

    public UserWebDTO() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserWebDTO(User user) {
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.id = user.getId();
        this.email = user.getEmail();
        
        this.role = prepareRole(user);
    }

    private RoleDTO prepareRole(User user) {
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            return new RoleDTO(user.getRoles().stream().findFirst().get());
        }
        return null;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public RoleDTO getRole() {
        return role;
    }

    public void setRole(RoleDTO roleDTO) {
        this.role = roleDTO;
    }
}

