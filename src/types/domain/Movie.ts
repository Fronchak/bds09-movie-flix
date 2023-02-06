export type Movie = {
  id: number;
  title: string;
  subTitle: string;
  year: number;
  imgUrl: string;
  synopsis: string;
  genre: SimpleGenre;
}

type SimpleGenre = {
  id: number;
  name: string;
}
