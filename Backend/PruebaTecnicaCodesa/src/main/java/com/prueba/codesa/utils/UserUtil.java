package com.prueba.codesa.utils;

import com.prueba.codesa.models.UserModel;
import com.prueba.codesa.services.UserService;

import java.util.ArrayList;
import java.util.Locale;
import java.util.stream.Collectors;

public class UserUtil {
    /**
     * True=Hay concidencias
     * False=No hay coincidencias
     **/
    public static Boolean compareName(ArrayList<UserModel> userList, String name) {
        return userList.stream().anyMatch(customer -> customer.getNombre().equalsIgnoreCase(name));
    }

    public static ArrayList<UserModel> filterByName(ArrayList<UserModel> userList, String name) {
        return new ArrayList<>(userList.stream().filter(user -> user.getNombre().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList()));
    }

}
