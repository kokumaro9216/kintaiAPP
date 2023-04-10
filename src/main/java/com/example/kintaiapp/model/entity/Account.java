package com.example.kintaiapp.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "account", schema = "public")
public class Account {

    @Column(name = "No")
    private Integer No;

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "mail")
    private String mail;

    @Column(name = "password")
    private String password;

    @Column(name = "creation_date")
    private LocalDate creation_date;

    @Column(name = "updated_date")
    private LocalDate updated_date;

}
