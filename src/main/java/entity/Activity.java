package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
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
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@NamedQueries({
	@NamedQuery(name = "Activity.findAll", query = "SELECT a FROM Activity a" ),
	@NamedQuery(name = "Activity.countAll", query = "SELECT COUNT(a) FROM Activity a")
})
@Table(name = "activities")
@DynamicInsert
@DynamicUpdate
public class Activity implements Serializable, Comparable<Activity>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "activity_id")
	private Long id;
	
	//@JsonIgnore
	@ManyToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name = "id_training")
	@JsonBackReference(value="act-training")
	//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@TrainingActivity")
	private Training training;
	
	@ManyToOne
	@JoinColumn(name = "id_exercise")
	private Exercise exercise;
	
	@OneToMany(mappedBy = "activity", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	@JsonManagedReference(value="act-series")
	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@ActivitySeries")
	@javax.persistence.OrderBy("id")
	private SortedSet<Series> series;
	
	public Activity(){}
	
	public Activity(Training training, Exercise exercise){
		this.training = training;
		this.exercise = exercise;
	}
	
	public Activity(Training training, Exercise exercise, Series series){
		this.training = training;
		this.exercise = exercise;
		this.series.add(series);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Training getTraining() {
		return training;
	}

	public void setTraining(Training training) {
		this.training = training;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public SortedSet<Series> getSeries() {
		return series;
	}

	public void setSeries(SortedSet<Series> series) {
		this.series = series;
	}

	@Override
	public String toString() {
		return "Activity [id=" + id + ", exercise=" + exercise + ", series=" + series + "]";
	}

	@Override
	public int compareTo(Activity activity) {
		// TODO Auto-generated method stub
		if(this.id != null && activity.getId() != null){
		return this.id.compareTo(activity.getId());
		}else return 1;
	}
	
	
}
