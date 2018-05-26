package com.blogspot.regulargeek.repository;

import com.blogspot.regulargeek.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	User findUserByEmail( String email );
}
