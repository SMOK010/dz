package rest;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ejb.BodyPartRepository;
import entity.BodyPart;

@RequestScoped
@Path("/bodyparts")
@Produces(MediaType.APPLICATION_JSON)
public class BodyPartEndpoint {

	@Inject
	private BodyPartRepository bodyRepo;

	@Context
    private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllBodyParts(){
		List<BodyPart> bodyParts = bodyRepo.getAll();
		return Response.ok(bodyParts)
				.build();
	}
    
    @GET
	@Path("/{id}")
	public Response getBodyPartById(@PathParam("id") Long id){
    	BodyPart bodyPart = bodyRepo.getBodyPartById(id);
		if (bodyPart == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(bodyPart).build();
	    }
	}
	
    @POST
    public BodyPart createTraining(BodyPart bodyPart) {
		Long id = bodyPart.getId();
        if (id == null) {
        	BodyPart bodyPartToSave = new BodyPart();
        	setBodyPart(bodyPart, bodyPartToSave);
            bodyRepo.add(bodyPartToSave);
            return bodyPartToSave;
        } else {
        	BodyPart bodyPartToUpdate = bodyRepo.getBodyPartById(bodyPart.getId());
        	setBodyPart(bodyPart, bodyPartToUpdate);
        	bodyPart = bodyRepo.update(bodyPartToUpdate);
        }
     return bodyPart;
    }
    
    @DELETE
	@Path("{id}")
	public Response removeTraining(@PathParam("id") Long id){
		BodyPart bodyPart = bodyRepo.getBodyPartById(id);
		if(bodyPart != null){
			bodyRepo.delete(bodyPart);
		}
		return Response.ok(bodyPart).build();
	}
    
	private void setBodyPart(BodyPart bodyPart, BodyPart bodyPartToSave){
		bodyPartToSave.setName(bodyPart.getName());
		bodyPartToSave.setExercises(bodyPart.getExercises());
	}
}
