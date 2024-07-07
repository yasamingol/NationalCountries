package NationalCountries.controllers;

import NationalCountries.dto.CreateApiTokenRequest;
import NationalCountries.dto.ApiTokenResponse;
import NationalCountries.entity.ApiToken;
import NationalCountries.exceptions.TokenNotFoundException;
import NationalCountries.services.ApiTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/api-tokens")
@AllArgsConstructor
public class ApiTokenController {

    private ApiTokenService apiTokenService;

    @CrossOrigin
    @PostMapping
    public ApiTokenResponse createToken(Authentication authentication, @RequestBody CreateApiTokenRequest request) {
        ApiToken apiToken = apiTokenService.createToken(request.getName(), request.getExpirationDate(), authentication.getName());
        return new ApiTokenResponse(apiToken.getName(), apiToken.getExpirationDate(), "API " + apiToken.getToken());
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> getTokens(Authentication authentication, @RequestParam(defaultValue = "2") int pageNumber,
                                         @RequestParam(defaultValue = "3") int pageSize) {
        return new ResponseEntity<>(apiTokenService.findAllByUser(authentication.getName(), pageNumber, pageSize), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping
    public ResponseEntity<?> deleteToken(Authentication authentication, @RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(4);
        System.out.println(tokenValue);
        try {
            return new ResponseEntity<>(apiTokenService.deleteToken(tokenValue, authentication.getName()), HttpStatus.OK);
        } catch (TokenNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(e.getStatusCode()));
        }
    }
}
