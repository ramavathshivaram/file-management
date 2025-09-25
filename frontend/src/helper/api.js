import axios from "axios";
import { toast } from "sonner";

const URL = "http://localhost:3000/api";

const API = axios.create({
  baseURL: URL,
});

// Interceptor to attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user-storage");
      localStorage.removeItem("folder-store");
      window.location.href = "/login-or-register";
      toast.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

// USER API FETCHING
const login = async (formData) => {
  console.log("🔑 Login request:", formData);
  const res = await API.post("/users/login", formData);
  localStorage.setItem("token", res.data.token);
  console.log("✅ Login response:", res.data);
  return res.data;
};

const register = async (formData) => {
  console.log("📝 Register request:", formData);
  const res = await API.post("/users/register", formData);
  localStorage.setItem("token", res.data.token);
  console.log("✅ Register response:", res.data);
  return res.data;
};

// FOLDER API FETCHING
const createFolder = async (formData) => {
  console.log("📂 Create folder request:", formData);
  const res = await API.post("/folders/create", formData);
  toast.success("Folder created successfully");
  console.log("✅ Create folder response:", res.data);
  return res.data;
};

const getFolderContent = async (folderId) => {
  console.log("📂 Get folder content request:", folderId);
  const res = await API.get(`/folders/${folderId}`);
  console.log("✅ Folder content response:", res.data);
  return res.data;
};

const deleteFolder = async (folderId) => {
  console.log("📂 Delete folder request:", folderId);
  const res = await API.delete(`/folder/${folderId}`);
  console.log("✅ Folder content response:", res.data);
  return res.data;
};
const renameFolder = async (folderId) => {
  console.log("📂 Rename folder request:", folderId);
  const res = await API.patch(`/folder/rename/${folderId}`);
  console.log("✅ Folder content response:", res);
  return res;
};
const moveFolder = async (obj) => {
  console.log("📂 move folder request:", obj);
  const res = await API.patch(`/folder/move`, obj);
  console.log("✅ Folder content response:", res);
  return res.data;
};

export {
  login,
  register,
  createFolder,
  getFolderContent,
  deleteFolder,
  renameFolder,
  moveFolder,
};
