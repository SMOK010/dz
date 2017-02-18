package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.Training;

@Stateless
public class TrainingRepository {
	
	@PersistenceContext
	EntityManager em;
	
	private Integer getAllTrainingsCount(){
		Query getAllCountQuery = em.createNamedQuery("Training.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<Training> getAll(){
		TypedQuery<Training> getAllQuery = em.createNamedQuery("Training.findAll", Training.class);
		List<Training> trainings = getAllQuery.getResultList();
		return trainings;
	}
	
	public void add(Training training){
		em.persist(training);
	}
	
	public Training update(Training training){
		return em.merge(training);
	}
	
	public void delete(Training training){
		em.remove(em.contains(training) ? training : em.merge(training));
	}
	
	public Training getTrainingById(Long id){
		return em.find(Training.class, id);
	}
	
}
