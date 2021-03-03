package handlers

import (
	"github.com/matthewputra/worldwide/server/gateway/models/users"
	"time"
)

// SessionState stores the start time and the user information
// for a given session
type SessionState struct {
	StartTime time.Time   `json:"start_time"`
	User      *users.User `json:"user"`
}
