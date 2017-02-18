package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.User;
import wrappers.PaginatedListWrapper;

@Stateless
public class UserRepository {

	@PersistenceContext
	private EntityManager em;
	
	private Integer getAllUsersCount(){
		Query getAllCountQuery = em.createNamedQuery("User.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<User> getAll(){
		TypedQuery<User> getAllQuery = em.createNamedQuery("User.findAll", User.class);
		List<User> users = getAllQuery.getResultList();
		
		users.get(0).getRoles().size();
		users.get(0).getLogs().size();
		users.get(0).getTrainings().size();
		return users;
	}
	
	public void add(User user){
		em.persist(user);
	}
	
	public User update(User user){
		return em.merge(user);
	}
	
	public void delete(User user){
		em.remove(em.contains(user) ? user : em.merge(user));
	}
	
	public User getUserByName(String username){
		TypedQuery<User> getUserByNameQuery = em.createNamedQuery("User.findUserByUsername", User.class);
		getUserByNameQuery.setParameter("username", username);
		List<User> users = getUserByNameQuery.getResultList();
		User resultUser = null;
		if(users != null && users.size() > 0){
			resultUser = users.get(0);
		}
		return resultUser;
	}
	
	public User getUserByUsername(String username){
		return em.find(User.class, username);
	}
	
	@SuppressWarnings("unchecked")
    private List<User> findUsers(int startPosition, int maxResults, String sortFields, String sortDirections) {
		Query query = em.createQuery("SELECT u FROM User u ORDER BY " + sortFields + " " + sortDirections);
		query.setFirstResult(startPosition);
        query.setMaxResults(maxResults);
        return query.getResultList();
    }
	
	public PaginatedListWrapper<User> findUsers(PaginatedListWrapper<User> wrapper) {
        wrapper.setTotalResults(getAllUsersCount());
        int start = (wrapper.getCurrentPage() - 1) * wrapper.getPageSize();
        wrapper.setList(findUsers(start,
                                    wrapper.getPageSize(),
                                    wrapper.getSortFields(),
                                    wrapper.getSortDirections()));
        return wrapper;
    }
}
