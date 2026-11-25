// Google reviews, word for word from the live site: never edit them.
// The "Michael Dawson" review stays: a different person from our Michael (umbrella Notion task).
import { photo } from './types'

export interface Review { name: string; quote: string }

export const reviews: Review[] = [
  { name: 'Tyrique Slingers', quote: "As a creative, I found this space to be quite interesting. It isn't the average co-working space. My favourite part is being able to go to the gym which is right next door!" },
  { name: 'Mbali Sibisi', quote: 'i work hybrid and being able to find a cosy desk i can call my own puts my mind at ease. would defs recommend ☺️' },
  { name: 'Danica Robson', quote: "A great coworking space, it's clean, comfortable, and well-maintained. The staff are friendly and welcoming, creating a pleasant and productive atmosphere. Perfect for anyone looking for a professional yet relaxed workspace!" },
  { name: 'Lauren Gracie', quote: 'Loving this space! The office is very open and spacious, lots of plants, and super cool little added features like a pool table, cute meeting booths, and multiple coffee stations' },
  { name: 'Michael Dawson', quote: "For a new office space it's pretty good. The space is really well set up and it's nice that you get a 2nd monitor to use." },
]

// Photos of the space that ride between the review cards (ReviewIdeas F, 2026-11-20): colour from the place
// people are praising. The first two go in the top row, the last two in the bottom row.
export const reviewPhotos = [
  photo('photos', 'booths-5532', 'The meeting booths'),
  photo('photos', 'kitchen-5567', 'The kitchen'),
  photo('photos', 'pool-table-5552', 'The pool table'),
  photo('photos', 'seating-area-5522', 'The seating area'),
]
