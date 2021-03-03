package handlers

import "github.com/matthewputra/worldwide/servers/gateway/models/users"

type HandlerContext struct {
	Key          string
	SessionStore sessions.Store
	UserStore    users.Store
}
