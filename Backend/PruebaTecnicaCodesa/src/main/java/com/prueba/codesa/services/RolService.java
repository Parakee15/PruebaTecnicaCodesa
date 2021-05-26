package com.prueba.codesa.services;

import com.prueba.codesa.models.RolModel;
import com.prueba.codesa.repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RolService {
    @Autowired
    RolRepository rolRepository;

    public ArrayList<RolModel> getAllRoles() {
        return (ArrayList<RolModel>) rolRepository.findAll();
    }
}
