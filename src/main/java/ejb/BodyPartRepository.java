package ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entity.BodyPart;

@Stateless
public class BodyPartRepository {

	@PersistenceContext
	EntityManager em;
	
	private Integer getAllBodyPartsCount(){
		Query getAllCountQuery = em.createNamedQuery("BodyPart.countAll");
		Integer i = ((Long)getAllCountQuery.getSingleResult()).intValue();
		return i;
	}
	
	public List<BodyPart> getAll(){
		TypedQuery<BodyPart> getAllQuery = em.createNamedQuery("BodyPart.findAll", BodyPart.class);
		List<BodyPart> bodyParts = getAllQuery.getResultList();
		
		return bodyParts;
	}
	
	public void add(BodyPart bodyPart){
		em.persist(bodyPart);
	}
	
	public BodyPart update(BodyPart bodyPart){
		return em.merge(bodyPart);
	}
	
	public void delete(BodyPart bodyPart){
		em.remove(em.contains(bodyPart) ? bodyPart : em.merge(bodyPart));
	}
	
	public BodyPart getBodyPartById(Long id){
		return em.find(BodyPart.class, id);
	}
}
