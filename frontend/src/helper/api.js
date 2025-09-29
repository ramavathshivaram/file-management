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

const deleteFolder = async (folder) => {
  console.log("📂 Delete folder request:", folder);
  const res = await API.delete(`/folders/${folder.folderId}`, folder);
  console.log("✅ Folder content response:", res.data);
  return res.data;
};
const renameFolder = async (folder) => {
  console.log("📂 Rename folder request:", folder);
  const res = await API.patch(`/folders/rename/${folder.folderId}`, folder);
  console.log("✅ Folder content response:", res);
  return res;
};
const moveFolder = async (moveFolderObj) => {
  console.log("📂 move folder request:", moveFolderObj);
  const res = await API.patch(`/folders/move`, moveFolderObj);
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
