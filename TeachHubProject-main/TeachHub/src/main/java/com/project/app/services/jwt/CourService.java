
package com.project.app.services.jwt;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.CourDTO;
import com.project.app.models.Cour;
import com.project.app.models.Enseignant;
import com.project.app.repository.CourRepository;
import com.project.app.repository.EnseignantRepository;







@Service
public class CourService implements IcourService {
	@Autowired
	//c'est une instance de repository
	CourRepository courrep ;

	EnseignantRepository enseignantRepository;
	
	
	public CourService(CourRepository courrep, EnseignantRepository enseignantRepository) {
		super();
		this.courrep = courrep;
		this.enseignantRepository = enseignantRepository;
	}

	@Override
	public Cour addCour(CourDTO CourDTO,String usernameEns) {
		Cour c=this.mapToEntity(CourDTO);
		Enseignant e=this.enseignantRepository.findByEmail(usernameEns).orElseThrow();
		c.setEnseignant(e);
		 Cour savedCour = courrep.save(c);
		 
		return savedCour;
	}

	@Override
	public List<Cour> getAllCours(Long id) {
		List<Cour> c= courrep.findByEnseignant_Id(id);
		
			return c;	
				
	}
	public Cour mapToEntity(CourDTO courDTO) {
		Cour cour=new Cour();
		cour.setIdCours(courDTO.getIdCours());
		cour.setNom(courDTO.getNom());
		cour.setCoefficient(courDTO.getCoefficient());
		cour.setCredits(courDTO.getCredits());
		cour.setMethodeCalcul(courDTO.getMethodeCalcul());
		return cour;
	}

	@Override
	public void deleteCour(int courId) {
		// TODO Auto-generated method stub
		Cour cour=this.courrep.findById(courId).orElseThrow();
		this.courrep.delete(cour);
		
	}

	@Override
	public Cour updateCour(int courId, CourDTO courDTO) {
		// TODO Auto-generated method stub
		Cour cour=this.courrep.findById(courId).orElseThrow();
		cour.setNom(courDTO.getNom());
		cour.setCoefficient(courDTO.getCoefficient());
		cour.setCredits(courDTO.getCredits());
		cour.setMethodeCalcul(courDTO.getMethodeCalcul());
		return this.courrep.save(cour);
	}


}
