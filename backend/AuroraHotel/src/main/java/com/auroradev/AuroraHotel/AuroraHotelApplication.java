package com.auroradev.AuroraHotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuroraHotelApplication {
//start backend    .\start-backend.bat  or mvn spring-boot:run -x
	public static void main(String[] args) {
		SpringApplication.run(AuroraHotelApplication.class, args);
	}
	
	@org.springframework.context.annotation.Bean
	public org.springframework.boot.CommandLineRunner content(javax.sql.DataSource dataSource) {
		return args -> {
			try (java.sql.Connection connection = dataSource.getConnection()) {
				System.out.println("==========================================================");
				System.out.println("✅ DATABASE CONNECTION SUCCESSFUL: " + connection.getCatalog());
				System.out.println("==========================================================");
			} catch (java.sql.SQLException e) {
				System.err.println("==========================================================");
				System.err.println("❌ DATABASE CONNECTION FAILED: " + e.getMessage());
				System.err.println("==========================================================");
			}
		};
	}

}
