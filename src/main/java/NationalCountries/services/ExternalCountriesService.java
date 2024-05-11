package NationalCountries.services;

import NationalCountries.models.ExternalCountries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternalCountriesService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String EXTERNAL_API_URL = "https://countriesnow.space/api/v0.1/countries";

    public ExternalCountries fetchCountries() {
        return restTemplate.getForObject(EXTERNAL_API_URL, ExternalCountries.class);
    }
}
