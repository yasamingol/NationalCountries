package NationalCountries.services;

import NationalCountries.dto.UserDto;
import NationalCountries.entity.User;
import NationalCountries.repository.UserRepository;
import NationalCountries.services.UIRepresentationsServices.PaginationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    private PaginationService paginationService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username: " + username));

        Set<GrantedAuthority> authorities = user
                .getRoles()
                .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                true,
                true,
                true,
                authorities);
    }

    public List<Object> getAllUsers(int pageNumber, int pageSize) {
        List<Object> users = new ArrayList<>(userRepository.findAll().stream()
                .map(user -> new UserDto(user.getUsername(), user.getPassword(),
                        user.isEnabled(), user.getDateTime()))
                .collect(Collectors.toList()));
        System.out.println(users);
        return paginationService.paginate(users, pageNumber, pageSize);
    }
}