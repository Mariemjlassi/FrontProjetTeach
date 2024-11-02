package com.project.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.app.models.Cour;



@Repository
public interface CourRepository extends JpaRepository <Cour,Integer>{
	 List<Cour> findByEnseignant_Id(Long enseignantId);
	 Cour findByCode(String code);
}
