package com.api.rest.example.exampleApiRest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.rest.example.exampleApiRest.entities.User;

import java.util.Optional;

/*
 * Repository that define the methods to access to User's data 
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  

}