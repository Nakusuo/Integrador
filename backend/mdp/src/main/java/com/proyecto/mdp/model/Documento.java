package com.proyecto.mdp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "documentos")
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Enumerated(EnumType.STRING)
    private TipoAtencion tipoAtencion;

    private String anotaciones;

    private String tipoDocumento; // Para dashboard por tipo
    private String asignado;

    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaSalida;

    // Constructores
    public Documento() {}

    public Documento(String titulo, String descripcion, Estado estado, TipoAtencion tipoAtencion,
                     String anotaciones, String tipoDocumento, String asignado,
                     LocalDateTime fechaRegistro, LocalDateTime fechaSalida) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.tipoAtencion = tipoAtencion;
        this.anotaciones = anotaciones;
        this.tipoDocumento = tipoDocumento;
        this.asignado = asignado;
        this.fechaRegistro = fechaRegistro;
        this.fechaSalida = fechaSalida;
    }

    // Getters y Setters
    // ... genera todos los getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }

    public TipoAtencion getTipoAtencion() { return tipoAtencion; }
    public void setTipoAtencion(TipoAtencion tipoAtencion) { this.tipoAtencion = tipoAtencion; }

    public String getAnotaciones() { return anotaciones; }
    public void setAnotaciones(String anotaciones) { this.anotaciones = anotaciones; }

    public String getTipoDocumento() { return tipoDocumento; }
    public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }

    public String getAsignado() { return asignado; }
    public void setAsignado(String asignado) { this.asignado = asignado; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public LocalDateTime getFechaSalida() { return fechaSalida; }
    public void setFechaSalida(LocalDateTime fechaSalida) { this.fechaSalida = fechaSalida; }

    // Enumeraciones internas
    public enum Estado {
        EN_PROYECTO, STAND_BY, FINALIZADO
    }

    public enum TipoAtencion {
        PENDIENTE, ATENDIDO, INFORME, INFORME_TECNICO_CON_EETT
    }
}
