package com.blogspot.regulargeek.repository;

import com.blogspot.regulargeek.model.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

    Privilege findByName(String name);

    void delete(Privilege privilege);

}
