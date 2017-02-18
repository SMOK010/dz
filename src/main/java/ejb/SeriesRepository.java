package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.Series;
import entity.Series;

@Stateless
public class SeriesRepository {

	@PersistenceContext
	EntityManager em;
	
	private Integer getAllSeriesCount(){
		Query getAllCountQuery = em.createNamedQuery("Series.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<Series> getAll(){
		TypedQuery<Series> getAllQuery = em.createNamedQuery("Series.findAll", Series.class);
		List<Series> series = getAllQuery.getResultList();
		return series;
	}
	
	public void add(Series series){
		em.persist(series);
	}
	
	public Series update(Series series){
		return em.merge(series);
	}
	
	public void delete(Series series){
		em.remove(em.contains(series) ? series : em.merge(series));
	}
	
	public Series getSeriesById(Long id){
		return em.find(Series.class, id);
	}
}
