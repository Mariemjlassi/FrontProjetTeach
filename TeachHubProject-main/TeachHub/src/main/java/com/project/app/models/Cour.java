package com.project.app.models;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Data
@Entity
public class Cour {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
    private Integer idCours;

    private String nom;
    private float coefficient;
    private int credits;
    private String code;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="enseignant_id")
    private Enseignant enseignant;
    
    @ManyToMany
    @JoinTable(name = "course_student",joinColumns = @JoinColumn(name = "course_id"),inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Etudiant> students = new HashSet<>();
    
    
    
    
    
    private String methodeCalcul;
    public String getMethodeCalcul() {
		return methodeCalcul;
	}

	public void setMethodeCalcul(String methodeCalcul) {
		this.methodeCalcul = methodeCalcul;
	}

	
    
    public Cour() {
        super();
    }

	public Cour(int i, String string, float f, int j) {
		this.idCours=idCours;
		this.nom=string;
		this.coefficient=f;
		this.credits=j;
	}

	

}
