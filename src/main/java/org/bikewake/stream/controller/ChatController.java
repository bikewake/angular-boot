package org.bikewake.stream.controller;

import io.netty.util.CharsetUtil;
import org.bikewake.stream.jwt.KeyCloakJwt;
import org.bikewake.stream.model.ChatMessage;
import org.bikewake.stream.model.PostMessage;
import org.bikewake.stream.repository.StreamChatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@RestController
@RequestMapping("api")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = { RequestMethod.GET, RequestMethod.POST  }
)
public class ChatController {
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final static Long NUMBER_OF_DATABASE_RECORDS = 42L;
    private final StreamChatRepository chatRepository;
    private final Sinks.Many<ChatMessage> chatSink;

    public ChatController(StreamChatRepository chatRepository,
                          Sinks.Many<ChatMessage> chatSink) {
        this.chatRepository = chatRepository;
        this.chatSink = chatSink;
    }

    @GetMapping(path = "/sse-chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ang-role')")
    public Flux<ServerSentEvent<ChatMessage>> chatMessages() {
        return chatSink.asFlux().map(message -> ServerSentEvent.builder(message).build());
    }


    @PostMapping(value = "/chat", consumes=MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ang-role')")
    public void postMessage(@RequestBody final  PostMessage message) {

        var jwt = (KeyCloakJwt) SecurityContextHolder.getContext().getAuthentication();

        ChatMessage userMessage = new ChatMessage();
        userMessage.setSender(HtmlUtils.htmlEscape(jwt.getHumanName(), CharsetUtil.UTF_8.displayName()));
        userMessage.setMessage(HtmlUtils.htmlEscape(message.getMessage(), CharsetUtil.UTF_8.displayName()));
        userMessage.setTimeStamp(System.currentTimeMillis());

        ChatMessage dbMessage = new ChatMessage();
        dbMessage.setSender(jwt.getEmail());
        dbMessage.setMessage(message.getMessage());
        dbMessage.setTimeStamp(userMessage.getTimeStamp());

        chatSink.tryEmitNext(userMessage);
        chatRepository.save(dbMessage).subscribe();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void firstChatMessageAfterStartup() {
        ChatMessage systemMessage = new ChatMessage();
        systemMessage.setSender("System");
        systemMessage.setMessage("Chat Started");
        systemMessage.setTimeStamp(System.currentTimeMillis());

        chatRepository.save(systemMessage).subscribe();
        logger.debug("System Chat Started");
        chatSink.asFlux().subscribe();
    }

    @Scheduled(fixedRateString = "${chat.keep.alive}", initialDelay = 10000)
    public void periodicalSystemKeepAliveMessage() {
        ChatMessage systemMessage = new ChatMessage();
        systemMessage.setSender("System");
        systemMessage.setMessage("");
        systemMessage.setTimeStamp(System.currentTimeMillis());
        chatSink.tryEmitNext(systemMessage);
        checkDeleteRecords();
        logger.debug("Number of chat sink subscriber {}", chatSink.currentSubscriberCount());
    }

    private void checkDeleteRecords() {
        chatRepository.count().subscribe(
                allRecordsCount -> {
                    if (allRecordsCount > NUMBER_OF_DATABASE_RECORDS) {
                        chatRepository.deleteOldRecords(allRecordsCount - NUMBER_OF_DATABASE_RECORDS).subscribe();
                    }
                }
        );
    }
}
