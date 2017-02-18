package entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlTransient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@NamedQueries({
	@NamedQuery(name = "BodyPart.findAll", query = "SELECT b FROM BodyPart b" ),
	@NamedQuery(name = "BodyPart.countAll", query = "SELECT COUNT(b) FROM BodyPart b")
})
@Table(name = "body_parts")
@DynamicInsert
@DynamicUpdate
public class BodyPart implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "body_part_id")
	private Long id;
	private String name;
	@OneToMany(mappedBy = "bodyPart", fetch=FetchType.EAGER)
	@JsonManagedReference
	private Set<Exercise> exercises;
	
	public BodyPart(){}
	
	public BodyPart(String name)
	{
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(Set<Exercise> exercises) {
		this.exercises = exercises;
	}

	@Override
	public String toString() {
		return "BodyPart [id=" + id + ", name=" + name + ", exercises=" + exercises + "]";
	}
	
	
}
