package com.api.rest.example.exampleApiRest.shared;

import javax.validation.constraints.NotEmpty;

import lombok.Data;
@Data

public class UserDTO {
     private Integer id;
    
    private String nombre;
  
    private String apellido;

    private String telefono;

    private String email;
}
