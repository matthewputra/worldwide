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
	// TODO: Add handlers here
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, TLSCERT, TLSKEY, mux))
}
