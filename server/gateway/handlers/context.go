package handlers

import (
	"github.com/matthewputra/worldwide/server/gateway/models/users"
	"github.com/matthewputra/worldwide/server/gateway/sessions"
)

type HandlerContext struct {
	SigningKey   string
	SessionStore sessions.Store
	UserStore    users.Store
}
