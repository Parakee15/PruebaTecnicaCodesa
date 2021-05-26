package com.prueba.codesa.controllers;

import com.prueba.codesa.utils.HttpResponseUtil;
import com.prueba.codesa.models.UserModel;
import com.prueba.codesa.services.UserService;
import com.prueba.codesa.utils.MessagesUtil;
import com.prueba.codesa.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping()
    public ResponseEntity getUsers(@RequestParam(required = false) String name) {
        ArrayList<UserModel> userList = userService.getAllUsers();
        if (name != null) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.OK.value(),
                    UserUtil.filterByName(userList, name),
                    MessagesUtil.OK.getValue()
            ), HttpStatus.OK);
        }

        return new ResponseEntity(HttpResponseUtil.MapResponse(
                HttpStatus.OK.value(),
                userList,
                MessagesUtil.OK.getValue()
        ), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getUserById(@PathVariable("id") Long id) {
        if (userService.getUserById(id).isEmpty()) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.NOT_FOUND.value(),
                    null,
                    MessagesUtil.NOT_FOUND.getValue()
            ), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(HttpResponseUtil.MapResponse(
                HttpStatus.OK.value(),
                userService.getUserById(id).get(),
                MessagesUtil.OK.getValue()
        ), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity saveUser(@RequestBody UserModel user) {
        if (UserUtil.compareName(userService.getAllUsers(), user.getNombre())) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.MULTIPLE_CHOICES.value(),
                    null,
                    MessagesUtil.DUPLICATE.getValue()
            ), HttpStatus.MULTIPLE_CHOICES);
        }

        return new ResponseEntity(HttpResponseUtil.MapResponse(
                HttpStatus.CREATED.value(),
                userService.saveUser(user),
                MessagesUtil.CREATE.getValue()
        ), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity updateUser(@PathVariable("id") Long id, @RequestBody UserModel user) {
        if (userService.getUserById(id).isEmpty()) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.NOT_FOUND.value(),
                    null,
                    MessagesUtil.NOT_FOUND.getValue()
            ), HttpStatus.NOT_FOUND);
        }

        if (UserUtil.compareName(userService.getAllUsers(), user.getNombre())) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.MULTIPLE_CHOICES.value(),
                    null,
                    MessagesUtil.DUPLICATE.getValue()
            ), HttpStatus.MULTIPLE_CHOICES);
        }

        user.setId_usuario(id);
        return new ResponseEntity(HttpResponseUtil.MapResponse(
                HttpStatus.ACCEPTED.value(),
                userService.saveUser(user),
                MessagesUtil.UPDATED.getValue()
        ), HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteUserById(@PathVariable("id") Long id) {
        if (userService.getUserById(id).isEmpty()) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.NOT_FOUND.value(),
                    null,
                    MessagesUtil.NOT_FOUND.getValue()
            ), HttpStatus.NOT_FOUND);
        }

        if (userService.deleteUserById(id)) {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.OK.value(),
                    null,
                    MessagesUtil.DELETED.getValue()
            ), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpResponseUtil.MapResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null,
                    MessagesUtil.ERROR.getValue()
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
