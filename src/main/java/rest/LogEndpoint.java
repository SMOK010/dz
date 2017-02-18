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

import ejb.LogRepository;
import entity.Log;

@RequestScoped
@Path("/logs")
@Produces(MediaType.APPLICATION_JSON)
public class LogEndpoint {

	@Inject
	private LogRepository logRepo;

	@Context
    private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllLogs(){
		List<Log> logs = logRepo.getAll();
		return Response.ok(logs).build();
	}
    
    @GET
	@Path("/{id}")
	public Response getTrainingById(@PathParam("id") Long id){
    	Log log = logRepo.getLogById(id);
		if (log == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(log).build();
	    }
	}
	
    @POST
    public Log createLog(Log log) {
		Long id = log.getId();
        if (id == null) {
        	Log logToSave = new Log();
        	setLog(log, logToSave);
            logRepo.add(logToSave);
            return logToSave;
        } else {
        	Log logToUpdate = logRepo.getLogById(log.getId());
        	setLog(log, logToUpdate);
        	log = logRepo.update(logToUpdate);
        }
     return log;
    }
    
    @DELETE
	@Path("{id}")
	public Response removeLog(@PathParam("id") Long id){
		Log log = logRepo.getLogById(id);
		if(log != null){
			logRepo.delete(log);
		}
		return Response.ok(log).build();
	}
    
	private void setLog(Log log, Log logToSave){
		logToSave.setLogDate(log.getLogDate());
		logToSave.setUser(log.getUser());
	}
}
