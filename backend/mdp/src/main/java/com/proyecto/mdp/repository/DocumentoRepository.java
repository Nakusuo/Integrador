package com.proyecto.mdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.mdp.model.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    // Aquí puedes agregar consultas personalizadas si necesitas filtrar por estado, tipo, etc.
}
