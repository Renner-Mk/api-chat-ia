export interface chatREsponseDTO {
  id: string;
  userId: string;
  message: geminiResponseDTO;
}

export interface geminiResponseDTO {
  parts: [{ text: string }];
  role: string;
}

export interface messageDTO {
  chatId: string;
  sender: string;
  content: string;
}

export interface chatDTO {
  id: string;
  userId: string;
  updatedAt: Date;
}
