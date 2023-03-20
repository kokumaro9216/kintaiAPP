package com.example.kintaiapp.model.entity;

import javax.xml.crypto.Data;

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
    @Column(name = "ID")
    private String ID;

    @Column(name = "name")
    private String name;

    @Column(name = "mail")
    private String mail;

    @Column(name = "password")
    private String password;

    @Column(name = "creation_date")
    private Data creation_date;

    @Column(name = "updated_date")
    private Data updated_date;

}
