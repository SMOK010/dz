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

import ejb.SeriesRepository;
import entity.Series;

@RequestScoped
@Path("/series")
@Produces(MediaType.APPLICATION_JSON)
public class SeriesEndpoint {
	
	@Inject
	private SeriesRepository seriesRepo;

	@Context
    private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllSeries(){
		List<Series> seriess = seriesRepo.getAll();
		return Response.ok(seriess).build();
	}
    
    @GET
	@Path("/{id}")
	public Response getSeriesById(@PathParam("id") Long id){
    	Series series = seriesRepo.getSeriesById(id);
		if (series == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(series).build();
	    }
	}
	
    @POST
    public Series createSeries(Series series) {
		Long id = series.getId();
        if (id == null) {
        	Series seriesToSave = series;
            seriesRepo.add(seriesToSave);
            System.out.println("create");
            return seriesToSave;
        } else {
        	Series seriesToUpdate = seriesRepo.getSeriesById(series.getId());
        	setSeries(series, seriesToUpdate);
        	series = seriesRepo.update(seriesToUpdate);
        	System.out.println("update");
        }
     return series;
    }
    
    @DELETE
	@Path("{id}")
	public Response removeSeries(@PathParam("id") Long id){
		Series series = seriesRepo.getSeriesById(id);
		if(series != null){
			seriesRepo.delete(series);
		}
		return Response.ok(series).build();
	}
    
	private void setSeries(Series series, Series seriesToSave){
		seriesToSave.setRepeats(series.getRepeats());
		seriesToSave.setWeight(series.getWeight());
		seriesToSave.setActivity(series.getActivity());
	}

}
