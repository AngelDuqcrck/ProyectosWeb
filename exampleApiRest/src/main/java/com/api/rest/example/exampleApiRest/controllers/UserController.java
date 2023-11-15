package com.api.rest.example.exampleApiRest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.rest.example.exampleApiRest.services.UserService;
import com.api.rest.example.exampleApiRest.shared.Response;
import com.api.rest.example.exampleApiRest.shared.UserDTO;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public Response createUser(@RequestBody UserDTO userDTO) {
        Response response = new Response();

        try {
            UserDTO newUser = userService.createUser(userDTO);

            if (newUser != null) {
                response.setMessage("User created successfully");
            } else {
                response.setMessage("Unexpected error while user was created");
            }
        } catch (IllegalArgumentException e) {
            response.setMessage("Error: " + e.getMessage());
        }

        return response;
    }
}
