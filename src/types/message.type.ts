export interface IMessage {
    text: string;
    time: string;
    data: string;
    user: "gpt" | "me";
}