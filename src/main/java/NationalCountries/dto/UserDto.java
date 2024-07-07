package NationalCountries.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {

    private String username;
    private String password;
    private boolean isEnabled;
    private LocalDateTime dateTime;
}
