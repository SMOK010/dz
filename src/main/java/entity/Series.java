package entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
	@NamedQuery(name = "Series.findAll", query = "SELECT s FROM Series s" ),
	@NamedQuery(name = "Series.countAll", query = "SELECT COUNT(s) FROM Series s")
})
@Table(name = "series")
@DynamicInsert
@DynamicUpdate
public class Series implements Serializable, Comparable<Series>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "series_id")
	private Long id;
	private Integer weight;
	private Integer repeats;
	
	@ManyToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name = "id_activity")
	@JsonBackReference(value="act-series")
	private Activity activity;
	
	public Series(){}
	
	public Series(Integer weight, Integer repeats)
	{
		this.weight = weight;
		this.repeats = repeats;
	}
	
	public Series(Integer weight, Integer repeats, Activity activity)
	{
		this.weight = weight;
		this.repeats = repeats;
		this.activity = activity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getWeight() {
		return weight;
	}

	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	public Integer getRepeats() {
		return repeats;
	}

	public void setRepeats(Integer repeats) {
		this.repeats = repeats;
	}

	public Activity getActivity() {
		return activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	@Override
	public String toString() {
		return "Series [Id=" + id + ", weight=" + weight + ", repeats=" + repeats + "]";
	}

	@Override
	public int compareTo(Series series) {
		// TODO Auto-generated method stub
				if(this.id != null && series.getId() != null){
				return this.id.compareTo(series.getId());
				}else return 1;
	}

	
	
	
}
