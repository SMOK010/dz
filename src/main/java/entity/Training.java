package entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.persistence.CascadeType;
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
import javax.persistence.OrderColumn;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.OrderBy;
import org.hibernate.annotations.Sort;
import org.hibernate.annotations.SortType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

@Entity
@NamedQueries({
	@NamedQuery(name = "Training.findAll", query = "SELECT t FROM Training t" ),
	@NamedQuery(name = "Training.countAll", query = "SELECT COUNT(t) FROM Training t")
})
@Table(name="trainings")
@DynamicInsert
@DynamicUpdate
public class Training implements Serializable, Comparable<Training>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "training_id")
	private Long id;
	private String name;
	private String description;
	@Column(name= "training_date")
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate trainingDate;
	private Integer duration;
	@ManyToOne(cascade=CascadeType.DETACH)
	@JoinColumn(name = "id_user")
	@JsonBackReference(value="user-training")
	private User user;
	
	@OneToMany(mappedBy = "training", cascade = {CascadeType.ALL} ,fetch = FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	@JsonManagedReference(value="act-training")
	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@TrainingActivity")
	@javax.persistence.OrderBy("id")
	private SortedSet<Activity> activities;
	
	private Integer type;
	
	public Training(){}
	
	
	public Training(String name, String description, LocalDate trainingDate, Integer duration, User user, Activity activity)
	{
		this.name = name;
		this.description = description;
		this.trainingDate = trainingDate;
		this.duration = duration;
		this.user = user;
		this.activities.add(activity);
	}
	
	public Training(Long id, String description, LocalDate trainingDate, Integer duration, User user, Activity activity)
	{
		this.id = id;
		this.description = description;
		this.trainingDate = trainingDate;
		this.duration = duration;
		this.user = user;
		this.activities.add(activity);
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
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getTrainingDate() {
		return trainingDate;
	}

	public void setTrainingDate(LocalDate trainingDate) {
		this.trainingDate = trainingDate;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	public SortedSet<Activity> getActivities() {
		return activities;
	}

	public void setActivities(SortedSet<Activity> activities) {
		this.activities = activities;
	}
	
	public Integer getType() {
		return type;
	}
	
	public void setType(Integer type){
		this.type = type;
	}

	@Override
	public String toString() {
		return "Training [id=" + id + ", name=" + name + ", description=" + description + ", trainingDate=" + trainingDate + ", duration="
				+ duration + ", type=" + type + ", user=" + user + ", activities=" + activities + "]";
	}



	@Override
	public int compareTo(Training training) {
		// TODO Auto-generated method stub
		if(this.id != null && training.getId() != null){
			return this.id.compareTo(training.getId());
			}else return 1;
	}
	
	
}
