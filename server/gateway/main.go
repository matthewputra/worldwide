package main

import (
	"database/sql"
	"fmt"
	"github.com/matthewputra/worldwide/server/models/users"
	"log"
	"net/http"
	"os"
)

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

	db, err := sql.Open("mysql", DSN)
	if err != nil {
		fmt.Println("cannot open db - " + err.Error())
		os.Exit(1)
	}
	defer db.Close()

	mux := http.NewServeMux()

	// Handlers for logging in and signing up new customers/drivers
	sqlStore := users.NewMySQLStore(db)
	mux.HandleFunc("/signup", sqlStore.UserSignUpHandler)
	mux.HandleFunc("/login", ctx.UserLoginHandler)

	// TODO: remove this handler
	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Test"))
	})
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, TLSCERT, TLSKEY, mux))
}
