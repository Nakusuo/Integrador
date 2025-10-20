package com.proyecto.mdp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.mdp.model.Documento;
import com.proyecto.mdp.service.DocumentoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DocumentoService documentoService;

    @GetMapping("/resumen")
    public Map<String, Object> getResumen() {
        List<Documento> docs = documentoService.findAll();

        // Contadores generales
        int ingresados = docs.size();
        int salidos = (int) docs.stream().filter(d -> d.getFechaSalida() != null).count();
        int asignados = (int) docs.stream().filter(d -> d.getAsignado() != null && !d.getAsignado().isEmpty()).count();

        // Conteo por tipo de documento
        Map<String, Long> porTipo = docs.stream()
                .collect(Collectors.groupingBy(Documento::getTipoDocumento, Collectors.counting()));

        // Convertir a lista de maps para el frontend
List<Map<String, Object>> porTipoList = porTipo.entrySet().stream()
        .map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("tipo", e.getKey());
            map.put("cantidad", e.getValue().intValue()); // Convertimos Long a Integer
            return map;
        })
        .collect(Collectors.toList());


        // Retornar resumen completo
        return Map.of(
                "ingresados", ingresados,
                "salidos", salidos,
                "asignados", asignados,
                "porTipo", porTipoList
        );
    }
}
