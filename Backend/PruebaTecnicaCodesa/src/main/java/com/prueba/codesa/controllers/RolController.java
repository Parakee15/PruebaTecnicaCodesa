package com.prueba.codesa.controllers;


import com.prueba.codesa.services.RolService;
import com.prueba.codesa.utils.HttpResponseUtil;
import com.prueba.codesa.utils.MessagesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rol")
@CrossOrigin(origins = "http://localhost:4200")
public class RolController {
    @Autowired
    RolService rolService;

    @GetMapping()
    public ResponseEntity getAllRoles() {
        return new ResponseEntity(HttpResponseUtil.MapResponse(
                HttpStatus.OK.value(),
                rolService.getAllRoles(),
                MessagesUtil.OK.getValue()
        ), HttpStatus.OK);
    }
}
