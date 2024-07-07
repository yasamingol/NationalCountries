package NationalCountries.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class JwtAuthDto {
    private String jwtToken;
    private String role;
    private static String tokenType = "API";
}
