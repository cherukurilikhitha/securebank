package com.example.demo.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "http://localhost:4200")
public class LoanController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeLoan(@RequestBody Map<String, Object> payload) {
        String pythonUrl = "http://127.0.0.1:8000/analyze";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> pythonResponse =
                    restTemplate.exchange(pythonUrl, HttpMethod.POST, request, String.class);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
            return ResponseEntity.status(pythonResponse.getStatusCode())
                    .headers(responseHeaders)
                    .body(pythonResponse.getBody());
        } catch (Exception e) {
            String message = "Loan analysis service is unavailable. Please start the Python service on port 8000 (run: cd firstapp-python && uvicorn main:app --reload).";
            if (e.getMessage() != null && e.getMessage().contains("Connection refused")) {
                message = "Cannot connect to loan analysis service (port 8000). Please start the Python service: cd firstapp-python && uvicorn main:app --reload";
            }
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_JSON);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .headers(responseHeaders)
                    .body("{\"message\":\"" + message.replace("\"", "\\\"") + "\"}");
        }
    }
}
