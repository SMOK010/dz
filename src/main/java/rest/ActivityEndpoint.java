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

import ejb.ActivityRepository;
import ejb.TrainingRepository;
import entity.Activity;
import entity.Training;

@RequestScoped
@Path("/activities")
@Produces(MediaType.APPLICATION_JSON)
public class ActivityEndpoint {

	@Inject
	private ActivityRepository activityRepo;

	@Context
    private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllActivities(){
		List<Activity> activities = activityRepo.getAll();
		return Response.ok(activities).build();
	}
    
    @GET
	@Path("/{id}")
	public Response getActivityById(@PathParam("id") Long id){
    	Activity activity = activityRepo.getActivityById(id);
		if (activity == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(activity).build();
	    }
	}
	
    @POST
    public Activity createActivity(Activity activity) {
		Long id = activity.getId();
        if (id == null) {
        	Activity activityToSave = activity;
        	activityRepo.add(activityToSave);
            return activityToSave;
        } else {
        	Activity activityToUpdate = activityRepo.getActivityById(activity.getId());
        	setActivity(activity, activityToUpdate);
        	activity = activityRepo.update(activityToUpdate);
        }
     return activity;
    }
    
    @DELETE
	@Path("{id}")
	public Response removeActivity(@PathParam("id") Long id){
		Activity activity = activityRepo.getActivityById(id);
		if(activity != null){
			activityRepo.delete(activity);
		}
		return Response.ok(activity).build();
	}
    
	private void setActivity(Activity activity, Activity activityToSave){
		activityToSave.setExercise(activity.getExercise());
		activityToSave.setTraining(activity.getTraining());
		activityToSave.setSeries(activity.getSeries());
	}
}
