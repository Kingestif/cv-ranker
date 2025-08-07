export type RankedResults = {
  session_id: string
  job_description: string
  ranked_resumes: RankedResume[]
}

export type RankedResume = {
  filename: string
  applicant_name: string
  similarity: number
  text_preview: string
}