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

import ejb.TrainingRepository;
import ejb.UserRepository;
import entity.Training;

@RequestScoped
@Path("/trainings")
@Produces(MediaType.APPLICATION_JSON)
public class TrainingEndpoint {

	@Inject
	private TrainingRepository trainingRepo;
	
	private UserRepository userRepo;

	@Context
    private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTrainings(){
		List<Training> trainings = trainingRepo.getAll();
		return Response.ok(trainings).build();
	}
    
    @GET
	@Path("/{id}")
	public Response getTrainingById(@PathParam("id") Long id){
    	Training training = trainingRepo.getTrainingById(id);
		if (training == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(training).build();
	    }
	}
	
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Training createTraining(Training training) {
		Long id = training.getId();
        if (id == null) {
        	Training trainingToSave = training;
            trainingRepo.add(trainingToSave);
            return trainingToSave;
        } else {
        	Training trainingToUpdate = trainingRepo.getTrainingById(id);
        	setTraining(training, trainingToUpdate);
        	training = trainingRepo.update(trainingToUpdate);
        	}
        
        return training;
    }
    
    @DELETE
	@Path("{id}")
	public Response removeTraining(@PathParam("id") Long id){
		Training training = trainingRepo.getTrainingById(id);
		if(training != null){
			trainingRepo.delete(training);
		}
		return Response.ok(training).build();
	}
    
	private void setTraining(Training training, Training trainingToSave){
		trainingToSave.setId(training.getId());
		trainingToSave.setDescription(training.getDescription());
		trainingToSave.setTrainingDate(training.getTrainingDate());
		trainingToSave.setDuration(training.getDuration());
		trainingToSave.setType(training.getType());
		trainingToSave.setUser(training.getUser());
		trainingToSave.setActivities(training.getActivities());
	}
}
