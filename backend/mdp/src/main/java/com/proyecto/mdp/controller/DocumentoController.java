package com.proyecto.mdp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.mdp.model.Documento;
import com.proyecto.mdp.service.DocumentoService;

@RestController
@RequestMapping("/api/documentos")
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;

    @GetMapping
    public List<Documento> getAll() {
        return documentoService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Documento> getById(@PathVariable Long id) {
        return documentoService.findById(id);
    }

    @PostMapping
    public Documento create(@RequestBody Documento documento) {
        return documentoService.save(documento);
    }

    @PutMapping("/{id}")
    public Documento update(@PathVariable Long id, @RequestBody Documento documento) {
        documento.setId(id);
        return documentoService.save(documento);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        documentoService.deleteById(id);
    }
}
