package NationalCountries.services;

import NationalCountries.dto.CountryDetailDTO;
import NationalCountries.models.ExternalCountries;
import NationalCountries.dto.WeatherInfoDTO;
import NationalCountries.services.UIRepresentationsServices.PaginationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountriesService {


    @Autowired
    private ExternalCountriesService externalCountriesService;

    @Autowired
    private PaginationService paginationService;

    @Cacheable(value = "countries")
    public List<Object> findAllCountries(int pageNumber, int pageSize) {
        ExternalCountries response = externalCountriesService.fetchCountries();
        if (response != null && response.getCountries() != null) {
            List<Object> countries = new ArrayList<>(response.getCountries());
            return paginationService.paginate(countries, pageNumber, pageSize);
        }
        return List.of();
    }

    @Cacheable(value = "countryDetail", key = "#name")
    public CountryDetailDTO findCountryByName(String name) {
        return externalCountriesService.fetchCountryByName(name);
    }


    @Cacheable(value = "weatherInfo", key = "#name")
    public WeatherInfoDTO findCountriesCapitalCityWeather(String name) {
        return externalCountriesService.fetchWeatherForCapital(name);
    }
}
