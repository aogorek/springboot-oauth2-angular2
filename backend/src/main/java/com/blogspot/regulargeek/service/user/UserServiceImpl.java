package com.blogspot.regulargeek.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.blogspot.regulargeek.dto.UserWebDTO;
import com.blogspot.regulargeek.model.Role;
import com.blogspot.regulargeek.model.User;
import com.blogspot.regulargeek.repository.RoleRepository;
import com.blogspot.regulargeek.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private UserWebDTO toWebDTO(User user) {
        if (user == null) {
            return null;
        }

        UserWebDTO webDTO = new UserWebDTO(user);
        return webDTO;
    }

    @Override
    public List<UserWebDTO> getAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .map(user -> new UserWebDTO(user)).collect(Collectors.toList());

    }

    @Override
    public UserWebDTO getById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return toWebDTO(user);
    }

    @Override
    public UserWebDTO updateUser(UserWebDTO dto) {
        User user = userRepository.findById(dto.getId()).orElse(null);
        if (user == null) {
            return null;
        }
        dtoToUser(dto, user);
        userRepository.save(user);
        return dto;
    }

    @Override
    public UserWebDTO registerUser(UserWebDTO dto) {
        User user = new User();
        dtoToUser(dto, user);
        userRepository.save(user);
        return new UserWebDTO(user);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("" + userId);
        }
        userRepository.delete(user);
    }

    public void dtoToUser(UserWebDTO dto, User user) {
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        List <Role> roles = new ArrayList<>();
        if (dto.getRole() != null) {
            roles.add(roleRepository.getOne(dto.getRole().getId()));
        }
        user.setRoles(roles);
    }

}
