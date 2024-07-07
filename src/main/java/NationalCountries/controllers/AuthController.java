package NationalCountries.controllers;

import NationalCountries.dto.JwtAuthDto;
import NationalCountries.dto.UserDto;
import NationalCountries.exceptions.LoginException;
import NationalCountries.exceptions.RegistrationException;
import NationalCountries.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @CrossOrigin()
    @GetMapping(value = {"/meow"})
    public ResponseEntity<String> meower() {
        return ResponseEntity.ok("Meow");
    }

    @CrossOrigin()
    @PostMapping(value = {"/login"})
    public ResponseEntity<JwtAuthDto> login(@RequestBody UserDto userDto) throws LoginException {
//        String token = "";
        Map<String, String> response = new HashMap<>();
        try {
            response = authService.login(userDto);
        } catch (Exception e) {
            throw new LoginException("Error while processing login: " + e.getMessage(), e);
        }
        JwtAuthDto jwtAuthDto = new JwtAuthDto(response.get("token"), response.get("role"));
        return ResponseEntity.ok(jwtAuthDto);
    }

    @CrossOrigin()
    @PostMapping(value = {"/register"})
    public ResponseEntity<String> register(@RequestBody UserDto userDto) throws RegistrationException {
        try {
            authService.registerUser(userDto);
            return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
        } catch (RegistrationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
