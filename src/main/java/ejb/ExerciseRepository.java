package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.Exercise;
import entity.User;
import wrappers.PaginatedListWrapper;

@Stateless
public class ExerciseRepository {

	@PersistenceContext
	EntityManager em;
	
	private Integer getAllExercisesCount(){
		Query getAllCountQuery = em.createNamedQuery("Exercise.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<Exercise> getAll(){
		TypedQuery<Exercise> getAllQuery = em.createNamedQuery("Exercise.findAll", Exercise.class);
		List<Exercise> exercises = getAllQuery.getResultList();
		
		return exercises;
	}
	
	public void add(Exercise exercise){
		em.persist(exercise);
	}
	
	public Exercise update(Exercise exercise){
		return em.merge(exercise);
	}
	
	public void delete(Exercise exercise){
		em.remove(em.contains(exercise) ? exercise : em.merge(exercise));
	}
	
	public Exercise getExerciseById(Long id){
		return em.find(Exercise.class, id);
	}
	
	@SuppressWarnings("unchecked")
    private List<Exercise> findExercises(int startPosition, int maxResults, String sortFields, String sortDirections) {
		Query query = em.createQuery("SELECT e FROM Exercise e ORDER BY " + sortFields + " " + sortDirections);
		query.setFirstResult(startPosition);
        query.setMaxResults(maxResults);
        return query.getResultList();
    }
	
	public PaginatedListWrapper<Exercise> findExercises(PaginatedListWrapper<Exercise> wrapper) {
        wrapper.setTotalResults(getAllExercisesCount());
        int start = (wrapper.getCurrentPage() - 1) * wrapper.getPageSize();
        wrapper.setList(findExercises(start,
                                    wrapper.getPageSize(),
                                    wrapper.getSortFields(),
                                    wrapper.getSortDirections()));
        return wrapper;
    }
}
