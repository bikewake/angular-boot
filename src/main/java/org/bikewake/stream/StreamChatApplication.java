package org.bikewake.stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StreamChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(StreamChatApplication.class, args);
	}

}
