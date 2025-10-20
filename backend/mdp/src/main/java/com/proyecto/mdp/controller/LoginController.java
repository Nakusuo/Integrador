package com.proyecto.mdp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.mdp.model.Usuario;
import com.proyecto.mdp.service.UsuarioService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Optional<Usuario> user = usuarioService.login(request.getUsername(), request.getPassword());

        if (user.isPresent()) {
            return new LoginResponse(true, "Login exitoso", "fakeToken123");
        } else {
            return new LoginResponse(false, "Usuario o contraseña incorrectos", null);
        }
    }

    // --- Clases internas ---
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private boolean success;
        private String message;
        private String token;

        public LoginResponse(boolean success, String message, String token) {
            this.success = success;
            this.message = message;
            this.token = token;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getToken() { return token; }
    }
}
