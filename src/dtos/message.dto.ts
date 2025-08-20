export interface messageDTO {
  chatId: string;
  content: string;
}

export interface wsDTO {
  action: string;
  chatId: string;
  content: string;
}

export interface messageServiceDTO {
  chatId: string;
  sender: string;
  content: string;
}

export interface msgDTO {
  id: string;
  chatId: string;
  sender: string;
  content: string;
}

export interface messageGetDTO {
  sender: string;
  content: string;
}
