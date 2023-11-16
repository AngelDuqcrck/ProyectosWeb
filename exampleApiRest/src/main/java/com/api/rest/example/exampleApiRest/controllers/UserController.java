package com.api.rest.example.exampleApiRest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PutMapping("/update")
    public Response updateUser (@RequestParam Integer userId, @RequestBody UserDTO userDTO){
        Response response =new Response();
        try {
            UserDTO updatedUser  = userService.updateUser(userDTO, userId);
            if (updatedUser != null) {
                response.setMessage("User updated successfully");
            } else {
                response.setMessage("Unexpected error while user was created");
            }
        } catch (IllegalArgumentException e) {
            response.setMessage("Error" + e.getMessage());
        }

        return response;
    }

    @DeleteMapping("/delete")
    public Response deleteUser(@RequestParam Integer userId){
        Response response = new Response();

        try {
            userService.deleteUser(userId);
            response.setMessage("User deleted successfully");
        } catch (IllegalArgumentException e) {
            response.setMessage("Error while user was deleted");
        }

        return response;
    }

    @GetMapping ("/id")
    public UserDTO getUserById(@RequestParam Integer userId) {
        return userService.getUserById(userId);
    }

      @GetMapping
      public List<UserDTO>listUser(){
        return userService.listUser();
    }

}
