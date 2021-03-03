package users

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

//SqlStore represents a users.Store backed by mysql.
type SqlStore struct {
	//Sql client used to talk to database
	db *sql.DB
}

// Constructs a new SqlStore
func NewMySQLStore(db *sql.DB) *SqlStore {
	return &SqlStore{db: db}
}

// Store implementations

//GetByID returns the User with the given ID
func (sql *SqlStore) GetByID(id int64) (*User, error) {
	// Get user row
	getuserbyidSp := "select * from users where id=?"
	res, err := sql.db.Query(getuserbyidSp, id)
	if err != nil {
		return nil, ErrUserNotFound
	}

	// Make User
	var user User
	res.Next()
	err = res.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName,
		&user.FirstName, &user.LastName)
	if err != nil {
		return nil, err
	}
	// Close row
	res.Close()
	return &user, nil
}

//GetByEmail returns the User with the given email
func (sql *SqlStore) GetByEmail(email string) (*User, error) {
	// Get user row
	getuserbyemailSp := "select * from users where users.email=?;"
	res, err := sql.db.Query(getuserbyemailSp, email)
	if err != nil {
		return nil, ErrUserNotFound
	}

	// Make User
	var user User
	res.Next()
	err = res.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName,
		&user.FirstName, &user.LastName)
	if err != nil {
		return nil, err
	}
	// Close row
	res.Close()
	return &user, nil
}

//GetByUserName returns the User with the given Username
func (sql *SqlStore) GetByUserName(username string) (*User, error) {
	// Get user row
	getuserbyusernameSp := "select * from users where users.username=?;"
	res, err := sql.db.Query(getuserbyusernameSp, username)
	if err != nil {
		return nil, ErrUserNotFound
	}

	// Make User
	var user User
	res.Next()
	err = res.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName,
		&user.FirstName, &user.LastName)
	if err != nil {
		return nil, err
	}
	// Close row
	res.Close()
	return &user, nil
}

//Insert inserts the user into the database, and returns
//the newly-inserted User, complete with the DBMS-assigned ID
func (sql *SqlStore) Insert(user *User) (*User, error) {
	// Insert new user
	insertuserSp := "insert into users(email, pass_hash, username, first_name, last_name) values (?,?,?,?,?)"
	res, err := sql.db.Exec(insertuserSp, user.Email, user.PassHash,
		user.UserName, user.FirstName, user.LastName)
	if err != nil {
		return nil, err
	}

	// Update user
	id, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	user.ID = id

	return user, nil
}

//Update applies UserUpdates to the given user ID
//and returns the newly-updated user
func (sql *SqlStore) Update(id int64, updates *Updates) (*User, error) {
	// Get user
	user, err := sql.GetByID(id)
	if err != nil {
		return nil, err
	}

	// Update user
	err = user.ApplyUpdates(updates)
	if err != nil {
		return nil, err
	}

	// Update db
	updateuserSp := "update users set users.first_name=?, users.last_name=? where id=?"
	_, err = sql.db.Exec(updateuserSp, updates.FirstName, updates.LastName, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

//Delete deletes the user with the given ID
func (sql *SqlStore) Delete(id int64) error {
	deleteuserSp := "delete from users where id=?"
	_, err := sql.db.Exec(deleteuserSp, id)
	return err
}

// Insert user log in information to singInLog db
func (sql *SqlStore) InsertLogInInfo(id int64, ip string) error {
	insertSp := "insert into signInLog(user_id, time, ipaddress) values (?,NOW(),?)"
	_, err := sql.db.Exec(insertSp, id, ip)
	return err
}
