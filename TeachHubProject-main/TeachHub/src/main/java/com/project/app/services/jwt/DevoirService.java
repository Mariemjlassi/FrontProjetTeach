package com.project.app.services.jwt;

import java.io.IOException;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.project.app.dto.CourDTO;
import com.project.app.dto.DevoirDTO;
import com.project.app.models.Cour;
import com.project.app.models.Devoir;
import com.project.app.repository.CourRepository;
import com.project.app.repository.DevoirRepository;

import jakarta.transaction.Transactional;

@Service
public class DevoirService implements IDevoirService {
	@Autowired
    private DevoirRepository devoirRepository;
	@Autowired
    private CourRepository coursRepository;

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Transactional
	@Override 
	public Devoir addDevoir(DevoirDTO devoirDTO, int idCours) {
	    Devoir dev = this.mapToEntity(devoirDTO); // Convert DTO to Entity
	    Cour c = this.coursRepository.findById(idCours).orElseThrow();
	    dev.setCours(c);

	    // Set PDF file if it exists
	    if (devoirDTO.getPdf() != null && devoirDTO.getPdf().length != 0) {
	        dev.setPdf(devoirDTO.getPdf());  // Setting the PDF in the entity 'dev'
	    }

	    return devoirRepository.save(dev);  // Save the entity with the PDF to the database
	}
	

	@Override
	public List<Devoir> getAllDevoirs(Integer idCours) {
		  return this.devoirRepository.findAll().stream()
			        .filter(devoir -> devoir.getCours().getIdCours().equals(idCours))
			        .collect(Collectors.toList());
	}

	@Transactional
	public byte[] getDevoirPDF(Long idDevoir) {
	    TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
	    try {
	        Devoir devoir = this.devoirRepository.findById(idDevoir).orElseThrow();
	        if (devoir != null && devoir.getPdf() != null) {
	            return devoir.getPdf(); // retourner le contenu du PDF en tant que tableau de bytes
	        } else {
	            return null; // pas de fichier PDF trouvé
	        }
	    } finally {
	        transactionManager.commit(status);
	    }
	}
	 
	@Override
	public Devoir modifierDevoir(Long idDevoir, DevoirDTO devoirDTO) {
		 Devoir dev=this.devoirRepository.findById(idDevoir).orElseThrow();
		 dev.setBareme(devoirDTO.getBareme());
		 dev.setDateLimite(devoirDTO.getDateLimite());
		 dev.setDescription(devoirDTO.getDescription());
		 dev.setPonderation(devoirDTO.getPonderation());
		 dev.setStatut(devoirDTO.getStatut());
		 dev.setTypedevoir(devoirDTO.getTypedevoir());
		 return this.devoirRepository.save(dev);
	}

	@Override
	public void deleteDevoir(Long id) {
		// TODO Auto-generated method stub
		Devoir devoir=this.devoirRepository.findById(id).orElseThrow();
		this.devoirRepository.delete(devoir);	
	}
	

	public Devoir mapToEntity(DevoirDTO DevoirDTO) {
		Devoir dev=new Devoir();
		dev.setIdDevoir(DevoirDTO.getIdDevoir());
		dev.setBareme(DevoirDTO.getBareme());
		dev.setDateLimite(DevoirDTO.getDateLimite());
		dev.setPonderation(DevoirDTO.getPonderation());
		dev.setDescription(DevoirDTO.getDescription());
		dev.setStatut(DevoirDTO.getStatut());
		dev.setTypedevoir(DevoirDTO.getTypedevoir());
		return dev;
	}


}
