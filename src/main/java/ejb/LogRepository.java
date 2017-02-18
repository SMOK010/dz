package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.Log;
import entity.Training;

@Stateless
public class LogRepository {

	@PersistenceContext
	EntityManager em;
	
	private Integer getAllLogsCount(){
		Query getAllCountQuery = em.createNamedQuery("Log.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<Log> getAll(){
		TypedQuery<Log> getAllQuery = em.createNamedQuery("Log.findAll", Log.class);
		List<Log> logs = getAllQuery.getResultList();
		return logs;
	}
	
	public void add(Log log){
		em.persist(log);
	}
	
	public Log update(Log log){
		return em.merge(log);
	}
	
	public void delete(Log log){
		em.remove(em.contains(log) ? log : em.merge(log));
	}
	
	public Log getLogById(Long id){
		return em.find(Log.class, id);
	}
}
