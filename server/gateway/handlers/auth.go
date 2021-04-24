package handlers

import (
	"encoding/json"
	"net/http"
	"worldwide/server/gateway/models/users"
)

// UserSignUpHandler handles requests for creating a new customer
func (ctx *HandlerContext) UserSignUpHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		if r.Header.Get("Content-Type") != "application/json" {
			// 415 Invalid Request Body
			http.Error(w, "Invalid Content-Type", http.StatusUnsupportedMediaType)
			return
		}

		var createdUser *users.NewUser
		err := json.NewDecoder(r.Body).Decode(&createdUser)
		if err != nil {
			// 415 Invalid Request Body
			http.Error(w, "Bad response body", http.StatusUnsupportedMediaType)
			return
		}

		validateErr := createdUser.Validate()
		if validateErr != nil {
			// 400 Bad Request
			http.Error(w, validateErr.Error(), http.StatusBadRequest)
			return
		}

		validatedUser, err := createdUser.ToUser()
		if err != nil {
			// 400 Bad Request
			http.Error(w, "User data is invalid - "+err.Error(), http.StatusBadRequest)
			return
		}

		insertedUser, err := ctx.UserStore.Insert(validatedUser)
		if err != nil {
			// 500
			http.Error(w, "Error inserting user - "+err.Error(), http.StatusInternalServerError)
			return
		}

		// TODO: REMOVE THIS
		// Begin Session
		// ctx.newSession(insertedUser, w)

		// Gets the newly inserted user
		validUser, _ := ctx.UserStore.GetByID(insertedUser.ID)
		// Sets content-type, send 201 Status, send user back as JSON object
		validUserJSON, _ := json.Marshal(validUser)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		w.Write(validUserJSON)
	} else {
		// 405 Method Not Allowed
		http.Error(w, "Must be a POST request method", http.StatusMethodNotAllowed)
		return
	}
}

// UserLoginHandler handles requests for logging in user and returns a session ID.
// Also handles request for logging out a user
func (ctx *HandlerContext) UserLoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		// Check Content-Type is JSON
		if r.Header.Get("Content-Type") != "application/json" {
			// 415 Invalid Request Body
			http.Error(w, "Request body must be in JSON - "+r.Header.Get("Content-Type"), http.StatusUnsupportedMediaType)
			return
		}

		// Unmarshalling request body into credentials struct
		var userCredentials *users.Credentials
		err := json.NewDecoder(r.Body).Decode(&userCredentials)
		if err != nil {
			// 415 Invalid Request Body
			http.Error(w, "Invalid credentials", http.StatusUnsupportedMediaType)
			return
		}

		// Get user from sql db by email provided in credentials
		returningUser, err := ctx.UserStore.GetByEmail(userCredentials.Email)
		if returningUser.Email == "" || err != nil {
			// 401 Unauthorized
			returningUser.Authenticate("pass")
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		// Authenticate the user's passhash returned by GetByEmail with the password provided in credentials
		err = returningUser.Authenticate(userCredentials.Password)
		if err != nil {
			// 401 Authorized
			http.Error(w, "Failed to authenticate the credentials", http.StatusUnauthorized)
			return
		}

		// TODO: REMOVE THIS
		// Start new session with returning user
		// ctx.newSession(returningUser, w)

		userJSON, _ := json.Marshal(returningUser)
		// Set content-type, respond with 200 status, send user as JSON
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(userJSON)

	} else {
		http.Error(w, "Must be a POST", http.StatusMethodNotAllowed)
		return
	}
}
