package com.redmath.bankingapp;
import static org.mockito.Mockito.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redmath.bankingapp.balance.Balance;
import com.redmath.bankingapp.balance.BalanceService;
import com.redmath.bankingapp.transaction.TransactionService;
import com.redmath.bankingapp.user.User;
import com.redmath.bankingapp.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
public class BankingApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@MockBean
	private BalanceService balanceService;

	@MockBean
	private TransactionService transactionService;
	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testCreateUser() throws Exception {
		User user = new User();
		user.setUserName("testUser");
		user.setRole("USER");
		when(userService.create(any(User.class))).thenReturn(user);
		when(balanceService.createById(any(Long.class))).thenReturn(123);
		mockMvc.perform(MockMvcRequestBuilders
						.post("http://localhost:9080/api/v1/Users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(user)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testCreateUserConflict() throws Exception {
		when(userService.create(any(User.class))).thenReturn(null);


		User user = new User();
		user.setUserName("testUser");
		user.setRole("USER");
		mockMvc.perform(MockMvcRequestBuilders
						.post("http://localhost:9080/api/v1/Users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(user)))
				.andExpect(MockMvcResultMatchers.status().isConflict());
	}

	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testFindUserById() throws Exception {
		User user = new User();
		user.setId(1L);
		when(userService.findById(1L)).thenReturn(user);
		mockMvc.perform(MockMvcRequestBuilders
						.get("http://localhost:9080/api/v1/Users/1")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));
	}

	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testFindUserByIdNotFound() throws Exception {
		when(userService.findById(1L)).thenReturn(null);
		mockMvc.perform(MockMvcRequestBuilders
						.get("http://localhost:9080/api/v1/Users/1")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isNotFound());
	}

	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testDeleteUser() throws Exception {
		User user = new User();
		user.setId(1L);

		when(userService.findById(1L)).thenReturn(user);


		mockMvc.perform(MockMvcRequestBuilders
						.delete("http://localhost:9080/api/v1/Users/1")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
	}

	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testDeleteUserNotFound() throws Exception {
		when(userService.findById(1L)).thenReturn(null);


		mockMvc.perform(MockMvcRequestBuilders
						.delete("http://localhost:9080/api/v1/Users/1")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isNotFound());
	}


	@Test
	@WithMockUser(authorities = "ADMIN")
	public void testUpdateUserNotFound() throws Exception {
		when(userService.update(any(User.class), eq(1L))).thenReturn(null);
		User user = new User();
		user.setId(1L);

		mockMvc.perform(MockMvcRequestBuilders
						.put("http://localhost:9080/api/v1/Users/1")
						.contentType(MediaType.APPLICATION_JSON)
						.content(asJsonString(user)))
				.andExpect(MockMvcResultMatchers.status().isNotFound());
	}

	@Test
	@WithMockUser(authorities = "USER", username = "testUser")
	public void testUserDashboard() throws Exception {
		org.springframework.security.core.userdetails.User user =
				new org.springframework.security.core.userdetails.User(
						"testUser", "password", Collections.emptyList());


		when(userService.findIdByUsername("testUser")).thenReturn(1L);
		when(userService.findById(1L)).thenReturn(new User());
		when(balanceService.findById(1L)).thenReturn(new Balance());
		when(transactionService.findByUserId(1L)).thenReturn(new ArrayList<>());


		mockMvc.perform(MockMvcRequestBuilders
						.get("http://localhost:9080/api/v1/Users/all")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	private static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
