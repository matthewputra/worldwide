package handlers

import "net/http"

const OriginCORSHeader = "Access-Control-Allow-Origin"
const OriginCORSValue = "*"
const MethodCORSHeader = "Access-Control-Allow-Methods"
const MethodCORSValue = "GET, PUT, POST, PATCH, DELETE"
const HeaderCORSHeader = "Access-Control-Allow-Headers"
const HeaderCORSValue = "Content-Type, Authorization"
const ExposeHeaderCORSHeader = "Access-Control-Expose-Headers"
const ExposeHeaderCORSValue = "Authorization"
const MaxAgeCORSHeader = "Access-Control-Max-Age"
const MaxAgeCORSValue = "600"

// Cors is a middleware handler that allows handler functions
// to be callable cross-origin
type Cors struct {
	handler http.Handler
}

//ServeHTTP handles the request by passing it to the real
//handler and adding CORS headers to requests
func (c *Cors) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set(OriginCORSHeader, OriginCORSValue)
	w.Header().Set(MethodCORSHeader, MethodCORSValue)
	w.Header().Set(HeaderCORSHeader, HeaderCORSValue)
	w.Header().Set(ExposeHeaderCORSHeader, ExposeHeaderCORSValue)
	w.Header().Set(MaxAgeCORSHeader, MaxAgeCORSValue)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	c.handler.ServeHTTP(w, r)
}

//NewCors constructs a new Cors middleware handler
func NewCors(handlerToWrap http.Handler) *Cors {
	return &Cors{handlerToWrap}
}
