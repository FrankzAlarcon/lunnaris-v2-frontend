import { Movie } from "@/interfaces/movie";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getPosters = async () => {
  return [
    {
      id: generateId(),
      name: "John Wick Chapter 4",
      image: "/imgs/jhonwick-poster.png",
    }, {
      id: generateId(),
      name: "300",
      image: "/imgs/300-poster.jpg",
    }, {
      id: generateId(),
      name: 'Spiderman - No way home',
      image: "/imgs/nowayhome-poster.jpg",
    }, {
      id: generateId(),
      name: 'Avatar',
      image: "/imgs/avatar-poster.jpg",
    }
  ]

}

export const getMovies = async (): Promise<Movie[]> => {
  return [
    {
      id: generateId(),
      name: "John Wick Chapter 4",
      slug: "john-wick-chapter-4",
      image: "/imgs/johnwick-card.png",
    }, {
      id: generateId(),
      name: "Batman",
      slug: "batman",
      image: "/imgs/batman-card.png",
    }, {
      id: generateId(),
      name: 'Mad Max - Fury Road',
      slug: "mad-max-fury-road",
      image: "/imgs/madmax-card.png",
    }, {
      id: generateId(),
      name: 'Watchmen',
      slug: "watchmen",
      image: "/imgs/watchmen-card.png",
    }
  ]
}