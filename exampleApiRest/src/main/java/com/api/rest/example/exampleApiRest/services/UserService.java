package com.api.rest.example.exampleApiRest.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.rest.example.exampleApiRest.entities.User;
import com.api.rest.example.exampleApiRest.repositories.UserRepository;
import com.api.rest.example.exampleApiRest.shared.UserDTO;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO createUser(UserDTO userDTO) {
        User newUser = new User();
        BeanUtils.copyProperties(userDTO, newUser);

        User savedUser = userRepository.save(newUser);

        UserDTO savedUserDTO = new UserDTO();
        BeanUtils.copyProperties(savedUser, savedUserDTO);
        return savedUserDTO;
    }

    public UserDTO updateUser(UserDTO userDTO, Integer userId) {

        User foundUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BeanUtils.copyProperties(userDTO, foundUser);
        foundUser.setId(userId);
        User updatedUser = userRepository.save(foundUser);
        UserDTO updatedUserDTO = new UserDTO();
        BeanUtils.copyProperties(updatedUser, updatedUserDTO);
        return updatedUserDTO;
    }

    public void deleteUser(Integer userId){
         User foundUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(foundUser);

    }
}
