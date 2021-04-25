package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
	"worldwide/server/gateway/handlers"
	"worldwide/server/gateway/models/users"
)
type Director func(r *http.Request)

func main() {
	ADDR := os.Getenv("ADDR")
	if len(ADDR) == 0 {
		ADDR = ":443"
	}

	TLSCERT := os.Getenv("TLSCERT")
	TLSKEY := os.Getenv("TLSKEY")
	if len(TLSCERT) == 0 || len(TLSKEY) == 0 {
		os.Stdout.Write([]byte("No TLS environment variables found\n"))
		os.Exit(1)
	}

	DSN := os.Getenv("DSN")
	if len(DSN) == 0 {
		os.Stdout.Write([]byte("No DSN environment variables found\n"))
		os.Exit(1)
	}

	questionAdr := os.Getenv("QUESTIONSADDR")
	if len(questionAdr) == 0 {
		log.Fatalf("question microservice address not found")
	}
	var questionURLList []*url.URL
	for _, addr := range strings.Split(questionAdr, ",") {
		urlParse, err := url.Parse(addr)
		if err != nil {
			log.Fatalf("error parsing messsage address")
		}
		questionURLList = append(questionURLList, urlParse)
	}

	db, err := sql.Open("mysql", DSN)
	if err != nil {
		fmt.Println("cannot open db - " + err.Error())
		os.Exit(1)
	}
	defer db.Close()

	mux := http.NewServeMux()
	ctx := &handlers.HandlerContext{SigningKey: "key", SessionStore: nil, UserStore: users.NewMySQLStore(db)}

	// Create question proxy
	//questionDirector := CreateDirector(questionURLList, ctx)
	//questionProxy := &httputil.ReverseProxy{Director: questionDirector}
	questionProxy := httputil.NewSingleHostReverseProxy(
		&url.URL{Scheme: "http", Host: questionAdr})


	// Handlers for logging in and signing up new users
	mux.HandleFunc("/signup", ctx.UserSignUpHandler)
	mux.HandleFunc("/login", ctx.UserLoginHandler)
	mux.Handle("/question", questionProxy)

	// TODO: remove this handler
	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Test"))
	})
	wrappedMux := handlers.NewCors(mux)
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, TLSCERT, TLSKEY, wrappedMux))
}

//func CreateDirector(urlArr []*url.URL, ctx *handlers.HandlerContext) Director {
//	var pointer int32 = 0
//	return func(r *http.Request) {
//		specificURL := urlArr[int(pointer)%len(urlArr)]
//		atomic.AddInt32(&pointer, 1)
//		log.Printf(specificURL.String())
//		r.Header.Add("X-Forwarded-Host", r.Host)
//		r.Host = specificURL.Host
//		r.URL.Host = specificURL.Host
//		r.URL.Scheme = specificURL.Scheme
//
//		// Get user info
//		session := &handlers.SessionState{}
//		_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, session)
//		if err != nil {
//			r.Header.Del("X-User")
//		} else {
//			// Add user information to request header
//			user := &users.User{ID: session.User.ID}
//			currUser, _ := json.Marshal(user)
//			r.Header.Add("X-User", string(currUser))
//		}
//	}
//}
