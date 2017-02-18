package entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@NamedQueries({
	@NamedQuery(name = "Exercise.findAll", query = "SELECT e FROM Exercise e" ),
	@NamedQuery(name = "Exercise.countAll", query = "SELECT COUNT(e) FROM Exercise e")
})
@Table(name = "exercises")
@DynamicInsert
@DynamicUpdate
public class Exercise implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "exercise_id")
	private Long id;
	private String name;
	private String type;
	
	@ManyToOne()
	@JoinColumn(name = "id_body_part")
	@JsonBackReference
	private BodyPart bodyPart;
	
	@JsonIgnore
	@OneToMany(mappedBy = "exercise", fetch=FetchType.EAGER)
	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@ExerciseActivity")
	private Set<Activity> activities;
	
	public Exercise(){}
	
	public Exercise(String name, String type, BodyPart bodyPart){
		this.name = name;
		this.type = type;
		this.bodyPart = bodyPart;
	}
	
	public Exercise(String name, String type){
		this.name = name;
		this.type = type;
	}
	
	public Exercise(String name){
		this.name = name;
		/*this.bodyPart = bodyPart;*/
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
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public BodyPart getBodyPart() {
		return bodyPart;
	}

	public void setBodyPart(BodyPart bodyPart) {
		this.bodyPart = bodyPart;
	}

	public Set<Activity> getActivities() {
		return activities;
	}

	public void setActivities(Set<Activity> activities) {
		this.activities = activities;
	}

	@Override
	public String toString() {
		return "Exercise [id=" + id + ", name=" + name + ", type=" + type + "]";
	}
	
	

}
