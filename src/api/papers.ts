import axios from "@/config/axios";
import { NewPaper } from "@/interfaces/papers";

async function getRecommendReviewers(paper: NewPaper): Promise<string[]> {
  const { data } = await axios.post(
    "/task-reviewer-recommendation/papers/recommend",
    paper
  );
  return data;
}

async function getNotRecommendReviewers(paper: NewPaper): Promise<string[]> {
  const { data } = await axios.post(
    "/task-reviewer-recommendation/papers/not-recommend",
    paper
  );
  return data;
}

export { getRecommendReviewers, getNotRecommendReviewers };
