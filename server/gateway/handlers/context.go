package handlers

import (
	"worldwide/server/gateway/models/users"
	"worldwide/server/gateway/sessions"
)

type HandlerContext struct {
	SigningKey   string
	SessionStore sessions.Store
	UserStore    users.Store
}
