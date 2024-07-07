package NationalCountries.services.UIRepresentationsServices;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaginationService {

    public List<Object> paginate(List<Object> inputList, int pageNumber, int pageSize) {
        int totalItems = inputList.size();

        List<Object> paginatedList = new ArrayList<>();
        int start = pageNumber * pageSize;
        if (start < totalItems){
            int end = Math.min(start + pageSize, totalItems);
            return inputList.subList(start, end);
        }

        return paginatedList;
    }
}
