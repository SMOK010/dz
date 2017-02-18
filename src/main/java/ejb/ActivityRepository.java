package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.Activity;
import entity.Training;

@Stateless
public class ActivityRepository {

	@PersistenceContext
	EntityManager em;
	
	private Integer getAllActivitiesCount(){
		Query getAllCountQuery = em.createNamedQuery("Activity.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<Activity> getAll(){
		TypedQuery<Activity> getAllQuery = em.createNamedQuery("Activity.findAll", Activity.class);
		List<Activity> activities = getAllQuery.getResultList();
		return activities;
	}
	
	public void add(Activity activity){
		em.persist(activity);
	}
	
	public Activity update(Activity activity){
		return em.merge(activity);
	}
	
	public void delete(Activity activity){
		em.remove(em.contains(activity) ? activity : em.merge(activity));
	}
	
	public Activity getActivityById(Long id){
		return em.find(Activity.class, id);
	}
}
