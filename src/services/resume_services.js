import { apiClient, pdfClient } from "./services";

export default {
  update_resume(resume) {
    return apiClient.put(`resume/${resume.resume_id}`, resume);
  },
  get_all_resume() {
    return apiClient.get("resume")
  },
  get_resume_by_id(resume_id) {
    return apiClient.get(`resume/${resume_id}`)
  },
  delete_resume(resume_id) {
    return apiClient.delete(`resume/${resume_id}`)
  },
  add_resume(resume) {
    return apiClient.post("resume", resume);
  },
  update_resume(resume) {
    return apiClient.put(`resume/${resume.resume_id}`,resume)
  },
  get_resume_by_user_id(user_id) {
    return apiClient.get(`resume/user/${user_id}`)
  },
  get_user_resume_by_category(user_id) {
    return apiClient.get(`resume/allUserResumesByCategory/user/${user_id}`)
  },
  view_pdf(resume_id) {
    return pdfClient.get(`resume/viewResume/${resume_id}`, {
      responseType: 'blob',
    })
  },
  add_comment(req) {
    return apiClient.post("resume_comments",req)
  },
  get_resume_comments(id) {
    return apiClient.get(`resume_comments/resume/${id}`)
  }
};
