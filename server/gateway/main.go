package main

import (
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

	mux := http.NewServeMux()
	// TODO: remove this handler
	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Test"))
	})
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, TLSCERT, TLSKEY, mux))
}
