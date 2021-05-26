package com.prueba.codesa.utils;

import java.util.HashMap;
import java.util.Map;

public class HttpResponseUtil {
    public static Map<String, Object> MapResponse(int status, Object data, String msg) {
        Map<String, Object> response = new HashMap();
        response.put("status", status);
        response.put("data", data);
        response.put("msg", msg);
        return response;
    }
}
