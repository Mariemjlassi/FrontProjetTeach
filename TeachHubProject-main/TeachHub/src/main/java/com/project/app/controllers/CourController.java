package com.project.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.app.dto.CourDTO;
import com.project.app.models.Cour;
import com.project.app.models.Enseignant;
import com.project.app.services.jwt.IcourService;





@RestController
public class CourController {
	@Autowired
	private IcourService  courserv;
	
	@PostMapping(value="/addcour/{usernameEns}")
	public Cour addUser(@RequestBody CourDTO courDTO,@PathVariable("usernameEns") String usernameEns ) {
		return courserv.addCour(courDTO,usernameEns);
	}
	
	@GetMapping(value = "/cours/{id}")
    public List<Cour> getAllCours(@PathVariable(value="id") Long id) {
        return courserv.getAllCours(id); 
    }	
	@PutMapping("/updatecours/{id}")
	public ResponseEntity<Cour> updateCour(@PathVariable(value="id") int id,@RequestBody CourDTO courDTO){
		Cour cour=this.courserv.updateCour( id,courDTO);
		return ResponseEntity.status(HttpStatus.OK).body(cour);
		
	}
	@DeleteMapping("/deletecours/{id}")
	 public ResponseEntity<String> deleteCour(@PathVariable(value="id") int id){
		 this.courserv.deleteCour(id);
		 return ResponseEntity.status(HttpStatus.OK).body("Cours deleted successfully");
	 }
}
