import { Module } from "@nestjs/common";
import { ClientProxyMeetflow } from "./client.proxy";

@Module({
    providers: [ClientProxyMeetflow],
    exports: [ClientProxyMeetflow]
})

export class ProxyModule{
    
}