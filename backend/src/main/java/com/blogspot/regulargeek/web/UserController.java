package com.blogspot.regulargeek.web;

import com.blogspot.regulargeek.dto.UserWebDTO;
import com.blogspot.regulargeek.model.User;
import com.blogspot.regulargeek.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping( "/rest/users" )
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @RequestMapping( value = "/all", method = RequestMethod.GET )
    @PreAuthorize("hasAuthority('RIGHT_EDIT_USERS')")
    public ResponseEntity<List<UserWebDTO>> getAll() {
        List<UserWebDTO> userWebDTOs = userService.getAllUsers();
        if ( userWebDTOs != null ) {
            return new ResponseEntity<>( userWebDTOs, HttpStatus.OK );
        } else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }
    }

    @CrossOrigin
    @RequestMapping( value = "/get/{userId}", method = RequestMethod.GET )
    @PreAuthorize("hasAuthority('RIGHT_EDIT_USERS')")
    public ResponseEntity<UserWebDTO> getUser( @PathVariable Long userId ) {
        UserWebDTO userWebDTO = userService.getById( userId);
        if ( userWebDTO != null ) {
            return new ResponseEntity<>( userWebDTO, HttpStatus.OK );
        } else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }
    }

    @CrossOrigin
    @RequestMapping( value = "/update", method = RequestMethod.PUT )
    @PreAuthorize("hasAuthority('RIGHT_EDIT_USERS')")
    public ResponseEntity<UserWebDTO> updateUser(@RequestBody UserWebDTO dto) {
        UserWebDTO userWebDTO = userService.updateUser(dto);
        if ( userWebDTO != null ) {
            return new ResponseEntity<>( userWebDTO, HttpStatus.OK );
        } else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }
    }

    @CrossOrigin
    @RequestMapping( value = "/register", method = RequestMethod.POST )
    @PreAuthorize("hasAuthority('RIGHT_EDIT_USERS')")
    public ResponseEntity<UserWebDTO> registerUser(@RequestBody UserWebDTO dto) {
        UserWebDTO userWebDTO = userService.registerUser(dto);
        if ( userWebDTO != null ) {
            return new ResponseEntity<>( userWebDTO, HttpStatus.OK );
        } else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }
    }


    @CrossOrigin
    @RequestMapping( value = "/delete/{userId}", method = RequestMethod.DELETE )
    @PreAuthorize("hasAuthority('RIGHT_EDIT_USERS')")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long userId ) {
        try {
            userService.deleteUser(userId);
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }
            return new ResponseEntity<>( HttpStatus.OK, HttpStatus.OK );
    }

    @CrossOrigin
    @PreAuthorize("hasAuthority('RIGHT_EDIT_USERS')")
    @RequestMapping(method = RequestMethod.GET, value = "/userinfo")
    @ResponseBody
    public Map<String, Object> getExtraInfo(Authentication auth) {
        final Map<String, Object> additionalInfo = new HashMap<>();
        User user = (User) auth.getPrincipal();
        additionalInfo.put("full_name", user.getFullName());
        additionalInfo.put("given_name", user.getFullName());
        additionalInfo.put("first_name", user.getFirstName());
        return additionalInfo;
    }
}
