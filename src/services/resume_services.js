import apiClient from "./services";

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
  get_resume_by_user_id(resume_id) {
    return apiClient.get(`resume/user/${resume_id}`)
  }
};
