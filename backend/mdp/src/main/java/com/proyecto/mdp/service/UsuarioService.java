package com.proyecto.mdp.service;

import java.util.List;
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

    public List<Usuario> findAll() {
        return repo.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        return repo.findById(id);
    }

    public Usuario save(Usuario usuario) {
        return repo.save(usuario);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
