export type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Review = {
  id: string,
  comment: string,
  date?: string,
  rating: number,
  user: User,
}

export type feedbackReview = {
  id: string | undefined,
  comment: string,
  date?: string,
  rating: number,
}

export type Reviews = Review[];

