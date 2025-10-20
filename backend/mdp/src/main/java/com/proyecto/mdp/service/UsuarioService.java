package com.proyecto.mdp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto.mdp.model.Usuario;
import com.proyecto.mdp.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public Optional<Usuario> login(String username, String password) {
        return repo.findByUsername(username)
                   .filter(u -> u.getPassword().equals(password));
    }
}
