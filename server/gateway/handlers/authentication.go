package handlers

import (
	"encoding/json"
	"github.com/matthewputra/worldwide/server/models/users"
	"net/http"
	"path"
	"strconv"
	"strings"
	"time"
)

// Fake user to create pseudo time when authenticating user
var fakeUser users.User

// Fake password for fakeUser
var fakePassword string = "RANDOMPASSWORD"

// Handles request to create new user account
func (ctx *HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {
	// Check request method
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("request method must be POST"))
		return
	}

	// Check content type
	ctype := r.Header.Get("Content-Type")
	if ctype != "application/json" {
		w.WriteHeader(http.StatusUnsupportedMediaType)
		w.Write([]byte("request body must be in JSON format"))
		return
	}

	// Decode request user
	var newUser users.NewUser
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Create new user in database
	user, err := newUser.ToUser()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Insert user to db
	user, err = ctx.UserStore.Insert(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Begin new user session
	sessionState := SessionState{
		Time: time.Now(),
		User: *user,
	}
	_, err = sessions.BeginSession(ctx.Key, ctx.SessionStore, sessionState, w)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Respond
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(user)
}

// Handles request for a specific user
func (ctx *HandlerContext) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {
	// Authenticate user
	_, err := sessions.GetSessionID(r, ctx.Key)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("unauthorized user"))
		return
	}

	// Check request method
	if r.Method != http.MethodGet && r.Method != http.MethodPatch {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("request method must be GET or PATCH"))
		return
	}

	// GET Method
	if r.Method == http.MethodGet {
		// Get given id
		requestedUserID := path.Base(r.URL.Path)
		var int64ID int64

		// Convert given user ID to int64 type
		sessionState := &SessionState{}
		if requestedUserID == "me" {
			_, err := sessions.GetState(r, ctx.Key, ctx.SessionStore, sessionState)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(err.Error()))
				return
			}
			int64ID = sessionState.User.ID
		} else {
			int64ID, err = strconv.ParseInt(requestedUserID, 10, 64)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(err.Error()))
				return
			}
		}

		// Get user info with requested id
		user, err := ctx.UserStore.GetByID(int64ID)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte("given user id is not found"))
			return
		}

		// Respond
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(user)
	}

	// PATCH Method
	if r.Method == http.MethodPatch {
		// Get given user ID
		requestedID := path.Base(r.URL.Path)
		var int64ID int64
		// Get SessionState of given sessionID
		var sessionState SessionState
		_, err = sessions.GetState(r, ctx.Key, ctx.SessionStore, &sessionState)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}
		// Authenticate given id
		if requestedID != "me" {
			// Format requestedID to int64 type
			int64ID, err = strconv.ParseInt(requestedID, 10, 64)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(err.Error()))
				return
			}
			// Check user ID from sessionState with requestedID
			if sessionState.User.ID != int64ID {
				w.WriteHeader(http.StatusForbidden)
				w.Write([]byte("user ID in the request URL is not \"me\" or does not match the currently-authenticated user"))
				return
			}
		}
		// Get currently-authenticated user ID
		int64ID = sessionState.User.ID

		// Check content type
		ctype := r.Header.Get("Content-Type")
		if ctype != "application/json" {
			w.WriteHeader(http.StatusUnsupportedMediaType)
			w.Write([]byte("request body must be in JSON format"))
			return
		}

		// Get user info before update
		user, err := ctx.UserStore.GetByID(int64ID)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		// Decode request update
		var update users.Updates
		err = json.NewDecoder(r.Body).Decode(&update)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		// Update database
		user, err = ctx.UserStore.Update(int64ID, &update)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}

		// Respond
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(user)
	}
}

// Begins a new session using an existing user's credentials
func (ctx *HandlerContext) SessionsHandler(w http.ResponseWriter, r *http.Request) {
	// Check request method
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("request method must be POST"))
		return
	}

	// Check content type
	ctype := r.Header.Get("Content-Type")
	if ctype != "application/json" {
		w.WriteHeader(http.StatusUnsupportedMediaType)
		w.Write([]byte("request body must be in JSON format"))
		return
	}

	// Get request body
	var cred users.Credentials
	err := json.NewDecoder(r.Body).Decode(&cred)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Get user
	user, err := ctx.UserStore.GetByEmail(cred.Email)
	if err != nil {
		// Add pseudo time
		_ = fakeUser.SetPassword(fakePassword)
		_ = fakeUser.Authenticate(fakePassword)
		// End pseudo time
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("invalid credentials"))
		return
	}

	// Authenticate user
	err = user.Authenticate(cred.Password)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("invalid credentials"))
		return
	}

	// Begin new user session
	sessionState := SessionState{
		Time: time.Now(),
		User: *user,
	}
	_, err = sessions.BeginSession(ctx.Key, ctx.SessionStore, sessionState, w)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Get ip address
	ip := r.Header.Get("X-Forwarded-For")
	if ip != "" {
		ips := strings.Split(ip, ", ")
		ip = ips[0]
	} else {
		ip = r.RemoteAddr
	}
	// Log user sign-in info to db
	err = ctx.UserStore.InsertLogInInfo(user.ID, ip)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Respond
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(user)
}

// Ends current user's session
func (ctx *HandlerContext) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {
	// Check request method
	if r.Method != http.MethodDelete {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("request method must be DELETE"))
		return
	}

	// Check last path
	if path.Base(r.URL.Path) != "mine" {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("incorrect path"))
		return
	}

	// End session
	_, err := sessions.EndSession(r, ctx.Key, ctx.SessionStore)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Respond
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("signed out"))
}
