export interface InteractiveButtonData {
    type: InteractiveButtonType; // Type of the button
    reply: ButtonReplyData; // Button reply data
}

export interface ButtonData {
    payload?: string;
    text?: string;
}

export interface ButtonReplyData {
    title: string; // Display text on the button
    id: string; // Unique identifier for the button
}

export enum InteractiveButtonType {
    reply = "reply",
}
