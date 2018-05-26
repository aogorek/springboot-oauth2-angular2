package com.blogspot.regulargeek.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.blogspot.regulargeek.model.User;
import com.blogspot.regulargeek.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional
	public User loadUserByUsername(String email ) throws UsernameNotFoundException {
		User user =  userRepository.findUserByEmail( email );
		return user;
	}

}