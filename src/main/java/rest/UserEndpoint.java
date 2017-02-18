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

import ejb.UserRepository;
import entity.User;
import wrappers.PaginatedListWrapper;

@RequestScoped
@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserEndpoint{
	
	@Inject
	private UserRepository userRepo;

	@Context
    private HttpServletRequest request;
	
	/*@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUsers(){
		List<User> users = userRepo.getAll();
		return Response.ok(users).build();
	}*/
    
	@GET
	@Path("{username}")
	public Response getUserByUsername(@PathParam("username") String username){
		User user = userRepo.getUserByUsername(username);
		if (user == null) {
	        return Response.noContent().build();
	    } else {
	        return Response.ok(user).build();
	    }
	}
    
  //pobieranie listy uzytkowników do opakowuj¹cej listy
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public PaginatedListWrapper<User> listUsers(@DefaultValue("1")
                                                    @QueryParam("page")
                                                    Integer page,
                                                    @DefaultValue("id")
                                                    @QueryParam("sortFields")
                                                    String sortFields,
                                                    @DefaultValue("asc")
                                                    @QueryParam("sortDirections")
                                                    String sortDirections) {
        PaginatedListWrapper<User> paginatedListWrapper = new PaginatedListWrapper<>();
        paginatedListWrapper.setCurrentPage(page);
        paginatedListWrapper.setSortFields(sortFields);
        paginatedListWrapper.setSortDirections(sortDirections);
        paginatedListWrapper.setPageSize(10);
        
        return userRepo.findUsers(paginatedListWrapper);
    }
	
    @POST
    public User createUser(User user) {
		Long id = user.getId();
        if (id == null) {
        	User userToSave = new User();
        	setUser(user, userToSave);
            userRepo.add(userToSave);
            return userToSave;
        } else {
        	User userToUpdate = userRepo.getUserByUsername(user.getUsername());
        	setUser(user, userToUpdate);
            user = userRepo.update(userToUpdate);
        }
     return user;
    }
    
    @DELETE
	@Path("{username}")
	public Response removeUser(@PathParam("username") String username){
		User user = userRepo.getUserByName(username);
		if(user != null){
			userRepo.delete(user);
		}
		return Response.ok(user).build();
	}
    
	private void setUser(User user, User userToSave){
		userToSave.setUsername(user.getUsername());
    	userToSave.setEmail(user.getEmail());
    	userToSave.setFirstName(user.getFirstName());
    	userToSave.setLastName(user.getLastName());
    	userToSave.setPassword(user.getPassword());
    	userToSave.setAge(user.getAge());
    	userToSave.setGender(user.getGender());
    	userToSave.setRoles(user.getRoles());
    	userToSave.setTrainings(user.getTrainings());
    	userToSave.setLogs(user.getLogs());
    	userToSave.setActive(user.getActive());
	}
}
