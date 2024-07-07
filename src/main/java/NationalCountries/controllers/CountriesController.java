package NationalCountries.controllers;

import NationalCountries.config.RabbitMQConfig;
import NationalCountries.dto.CountryDetailDTO;
import NationalCountries.dto.WeatherInfoDTO;
import NationalCountries.services.CountriesService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/countries")
public class CountriesController {

    @Autowired
    private CountriesService countriesService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("")
    public Map<String, Object> listAllCountries(@RequestParam(defaultValue = "1") int pageNumber,
                                                @RequestParam(defaultValue = "100") int pageSize) {
        List<Object> countries = countriesService.findAllCountries(pageNumber, pageSize);
        Map<String, Object> response = new HashMap<>();
        response.put("countries", countries);
        response.put("page", pageNumber);
        response.put("size", pageSize);
        response.put("count", countries.size()); //TODO: Login in service
        return response;
    }

    @GetMapping("/{name}")
    public ResponseEntity<CountryDetailDTO> getCountryByName(@PathVariable String name) {
        CountryDetailDTO countryDetail = countriesService.findCountryByName(name);
        if (countryDetail != null) {
            return ResponseEntity.ok(countryDetail);
        } else {
            System.out.println("Country not found for name: " + name);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{name}/weather")
    public ResponseEntity<WeatherInfoDTO> getWeatherByCountryCapital(@PathVariable String name) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.REQUEST_QUEUE, name);

        try {
            WeatherInfoDTO weather = (WeatherInfoDTO) rabbitTemplate.receiveAndConvert(RabbitMQConfig.RESPONSE_QUEUE, 10000);
            if (weather != null) {
                return ResponseEntity.ok(weather);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace(); //TODO Hmm?
            return ResponseEntity.status(500).build();
        }
    }
}
