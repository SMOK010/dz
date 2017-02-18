package rest;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ejb.ExerciseRepository;
import entity.Exercise;
import entity.User;
import wrappers.PaginatedListWrapper;

@RequestScoped
@Path("/exercises")
@Produces(MediaType.APPLICATION_JSON)
public class ExerciseEndpoint {
	
	@Inject
	ExerciseRepository exRepo;

	@Context
    private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllExercises(){
		List<Exercise> exercises= exRepo.getAll();
		return Response.ok(exercises).build();
	}
	
	/*@GET
	@Produces(MediaType.APPLICATION_JSON)
    public PaginatedListWrapper<Exercise> listExercises(@DefaultValue("1")
                                                    @QueryParam("page")
                                                    Integer page,
                                                    @DefaultValue("id")
                                                    @QueryParam("sortFields")
                                                    String sortFields,
                                                    @DefaultValue("asc")
                                                    @QueryParam("sortDirections")
                                                    String sortDirections) {
        PaginatedListWrapper<Exercise> paginatedListWrapper = new PaginatedListWrapper<>();
        paginatedListWrapper.setCurrentPage(page);
        paginatedListWrapper.setSortFields(sortFields);
        paginatedListWrapper.setSortDirections(sortDirections);
        paginatedListWrapper.setPageSize(25);
        
        return exRepo.findExercises(paginatedListWrapper);
    }*/
    
    @GET
	@Path("/{id}")
	public Response getExerciseById(@PathParam("id") Long id){
    	Exercise exercise = exRepo.getExerciseById(id);
		if (exercise == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(exercise).build();
	    }
	}
	
    @POST
    public Exercise createExercise(Exercise exercise) {
		Long id = exercise.getId();
        if (id == null) {
        	Exercise exerciseToSave = new Exercise();
        	setExercise(exercise, exerciseToSave);
            exRepo.add(exerciseToSave);
            return exerciseToSave;
        } else {
        	Exercise exerciseToUpdate = exRepo.getExerciseById(exercise.getId());
        	setExercise(exercise, exerciseToUpdate);
        	exercise = exRepo.update(exerciseToUpdate);
        }
     return exercise;
    }
    
    @DELETE
	@Path("{id}")
	public Response removeTraining(@PathParam("id") Long id){
		Exercise exercise = exRepo.getExerciseById(id);
		if(exercise != null){
			exRepo.delete(exercise);
		}
		return Response.ok(exercise).build();
	}
    
	private void setExercise(Exercise exercise, Exercise exerciseToSave){
		exerciseToSave.setName(exercise.getName());
		exerciseToSave.setType(exercise.getType());
		exerciseToSave.setBodyPart(exercise.getBodyPart());
		exerciseToSave.setActivities(exercise.getActivities());
	}
}
