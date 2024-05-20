// NationalCountries/NationalCountriesSystemApplication.java
package NationalCountries;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableCaching
public class NationalCountriesSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(NationalCountriesSystemApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
