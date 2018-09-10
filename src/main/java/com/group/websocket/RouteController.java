package com.group.websocket;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteController{

    @RequestMapping("/chat-room")
    public String chatRoom(){
        return "chat-room";
    }
}
