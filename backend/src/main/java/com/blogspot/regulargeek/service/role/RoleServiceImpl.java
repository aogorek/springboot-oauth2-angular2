package com.blogspot.regulargeek.service.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blogspot.regulargeek.dto.RoleDTO;
import com.blogspot.regulargeek.repository.RoleRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<RoleDTO> getAllRoles() {
        return StreamSupport.stream(roleRepository.findAll().spliterator(), false)
                .map(role -> new RoleDTO(role)).collect(Collectors.toList());
    }
    
}
