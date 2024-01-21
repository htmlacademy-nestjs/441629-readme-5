export interface IToken {
  id?: string;
  tokenId: string;
  userId: string;
  createdAt: Date;
  expiresIn: Date;
}
