package com.prueba.codesa.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "rol")
public class RolModel {
    @Id
    @Column(unique = true, nullable = false)
    private Long id_rol;
    private String nombre;

    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL)
    private Set<UserModel> user = new HashSet();

    public Long getId_rol() {
        return id_rol;
    }

    public void setId_rol(Long id_rol) {
        this.id_rol = id_rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
