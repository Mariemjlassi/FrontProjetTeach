package com.project.app.services.jwt;

import java.util.List;
import java.util.Map;

import com.project.app.dto.CourDTO;
import com.project.app.models.Cour;
import com.project.app.models.Enseignant;



public interface IcourService {
	public Cour addCour(CourDTO Cour,String usernameEns);
	public List<Cour> getAllCours(Long id); 
	void deleteCour(int courId);
	Cour updateCour(int courId,CourDTO courDTO);
	 
}
