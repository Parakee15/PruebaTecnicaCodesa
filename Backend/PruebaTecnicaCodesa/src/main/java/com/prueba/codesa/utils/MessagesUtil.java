package com.prueba.codesa.utils;

public enum MessagesUtil {
    DUPLICATE("Registro duplicado, por favor verificar los datos"),
    CREATE("Creado exitosamente"),
    UPDATED("Actualizado correctamente"),
    OK("Exitoso"),
    NOT_FOUND("No encontrado"),
    DELETED("Registro eliminado"),
    ERROR("Ocurrio un error en la peticion");

    private final String message;

    MessagesUtil(final String message) {
        this.message = message;
    }

    public String getValue() {
        return message;
    }
}
