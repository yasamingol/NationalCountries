package NationalCountries.services;

import NationalCountries.dto.UserDto;
import NationalCountries.entity.User;
import NationalCountries.exceptions.RegistrationException;
import NationalCountries.repository.UserRepository;
import NationalCountries.services.Security.JwtTokenProviderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtTokenProviderService jwtTokenProviderService;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_UserAlreadyExists_ThrowsException() {
        UserDto userDto = new UserDto("existingUser", "password", false, null);
        when(userRepository.existsByUsername(anyString())).thenReturn(true);

        RegistrationException exception = assertThrows(RegistrationException.class, () -> {
            authService.registerUser(userDto);
        });

        assertEquals("Error while processing registration: Username is already taken.", exception.getMessage());
        verify(userRepository, times(1)).existsByUsername(anyString());
    }

    @Test
    void registerUser_UserDoesNotExist_Success() {
        UserDto userDto = new UserDto("newUser", "password", false, LocalDateTime.now());
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        ResponseEntity<String> response = authService.registerUser(userDto);

        assertEquals("Success", response.getBody());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void login_ValidUser_ReturnsToken() {
        UserDto userDto = new UserDto("validUser", "password", true, LocalDateTime.now());
        User enabledUser = new User();
        enabledUser.setEnabled(true);
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(enabledUser));
        when(authenticationManager.authenticate(any())).thenReturn(mock(Authentication.class));
        when(jwtTokenProviderService.generateToken(any())).thenReturn("jwtToken");

        Map<String, String> response = authService.login(userDto);

        assertEquals("jwtToken", response.get("token"));
        verify(authenticationManager, times(1)).authenticate(any());
        verify(jwtTokenProviderService, times(1)).generateToken(any());
    }
}
