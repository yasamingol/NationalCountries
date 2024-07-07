package NationalCountries.services.UIRepresentationsServices;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

class PaginationServiceTest {

    private final PaginationService paginationService = new PaginationService();

    @Test
    void testPaginateWithFullPages() {
        List<Object> inputList = new ArrayList<>();
        for (int i = 1; i <= 50; i++) {
            inputList.add(i);
        }
        List<Object> paginatedList = paginationService.paginate(inputList, 5, 10);

        assertEquals(5, paginatedList.size());
        for (int i = 0; i < 5; i++) {
            assertEquals(10, paginatedList.size();
        }
    }

    @Test
    void testPaginateWithPartialPages() {
        List<Object> inputList = new ArrayList<>();
        for (int i = 1; i <= 47; i++) {
            inputList.add(i);
        }

        List<Object> paginatedList = paginationService.paginate(inputList, 10, 5);

        assertEquals(10, paginatedList.size());
        for (int i = 0; i < 9; i++) {
            assertEquals(5, paginatedList.size());
        }
        assertEquals(2, paginatedList.size());
    }

    @Test
    void testPaginateWithEmptyPages() {
        List<Object> inputList = new ArrayList<>();
        for (int i = 1; i <= 50; i++) {
            inputList.add(i);
        }

        List<Object> paginatedList = paginationService.paginate(inputList, 11, 5);

        assertEquals(11, paginatedList.size());
        for (int i = 0; i < 10; i++) {
            assertEquals(5, paginatedList.size());
        }
        for (int i = 10; i < 11; i++) {
            assertTrue(paginatedList.isEmpty());
        }
    }
}
