package entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@NamedQueries({
	@NamedQuery(name = "Log.findAll", query = "SELECT l FROM Log l" ),
	@NamedQuery(name = "Log.countAll", query = "SELECT COUNT(l) FROM Log l")
})
@Table(name="logs")
@DynamicInsert
@DynamicUpdate
public class Log implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="log_id")
	private Long id;
	@Column(name="log_date")
	private LocalDate logDate;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="id_user")
	private User user;
	
	public Log(){}
	
	public Log(LocalDate logDate, User user)
	{
		this.logDate = logDate;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getLogDate() {
		return logDate;
	}

	public void setLogDate(LocalDate logDate) {
		this.logDate = logDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Log [id=" + id + ", logDate=" + logDate + ", user=" + user + "]";
	}

}
