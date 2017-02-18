package entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.SortedSet;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;


/**
 * Entity implementation class for Entity: User
 *
 */
@Entity
@NamedQueries({
	@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u" ),
	@NamedQuery(name = "User.findUserById", 
				query = "SELECT u FROM User u WHERE u.id = :id" ),
	@NamedQuery(name = "User.findUserByUsername", 
				query = "SELECT u FROM User u WHERE u.username = :username" ),
	@NamedQuery(name = "User.countAll", query = "SELECT COUNT(u) FROM User u")
})
@Table(name= "users")
@DynamicInsert
@DynamicUpdate
public class User  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id", columnDefinition="serial")
	private Long id;
	@Id
	private String username;
	@Column(columnDefinition="varchar(255) DEFAULT 'pass'")
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private Integer age;
	private String gender;
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "roles",
		joinColumns = @JoinColumn(name="username", referencedColumnName="username")
			)
	@Column(name="role")
	@LazyCollection(LazyCollectionOption.FALSE)
	private Set<String> roles;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private Set<Log> logs;
	
	@OneToMany(mappedBy = "user", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	@JsonManagedReference(value="user-training")
	@javax.persistence.OrderBy("id")
	private SortedSet<Training> trainings;
	
	private Integer isActive;
	
	
	public User(){}
	
	public User(String username, String password, String firstName, 
			String lastName, String email, String role, Integer isActive){
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.isActive = isActive;
		this.roles.add(role);
	}
	
	public User(String username, String password, String firstName, String lastName, String email, 
			String role, Integer age, String gender, Integer isActive){
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.age = age;
		this.gender = gender;
		this.isActive = isActive;
		this.roles.add(role);
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	
	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public Set<Log> getLogs() {
		return logs;
	}

	public void setLogs(Set<Log> logs) {
		this.logs = logs;
	}

	public SortedSet<Training> getTrainings() {
		return trainings;
	}

	public void setTrainings(SortedSet<Training> trainings) {
		this.trainings = trainings;
	}
	
	public Integer getActive() {
		return isActive;
	}

	public void setActive(Integer isActive) {
		this.isActive = isActive;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", age=" + age + ", gender=" + gender
				+ ", roles=" + roles + ", logs=" + logs + ", trainings=" + trainings
				+ "]";
	}
	
	
}
