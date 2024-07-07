package NationalCountries.controllers;

import NationalCountries.services.AdminService;
import NationalCountries.services.AppUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private AdminService adminService;
    private AppUserDetailsService userDetailsService;

    @CrossOrigin
    @GetMapping(value = "/users")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> listAllUsers(@RequestParam(defaultValue = "1") int pageNumber,
                                                            @RequestParam(defaultValue = "100") int pageSize) {
        List<Object> users = userDetailsService.getAllUsers(pageNumber, pageSize);
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin
    @PutMapping(value = "/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> updateUserActivation(@RequestParam String username, @RequestParam boolean active) {
        boolean isUpdated = adminService.updateUserActivation(username, active);
        if (isUpdated) {
            return ResponseEntity.ok("User activation updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update user activation.");
        }
    }
}
