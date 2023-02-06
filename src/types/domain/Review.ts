export type Review = {
  id: number;
  user: SimpleUser;
  text: string;
}

type SimpleUser = {
  id: number;
  user: string;
}
