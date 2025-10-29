// "use client";

// import { useState, useEffect } from "react";
// import styles from "./AdminProfile.module.css";

// interface AdminProfileProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function AdminProfile({ isOpen, onClose }: AdminProfileProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     profilePic: "/profile.webp", // default profile image
//   });

//   // Load user data from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         role: user.role || "",
//         profilePic: user.profilePic || "/profile.webp",
//       });
//     }
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const imageUrl = URL.createObjectURL(e.target.files[0]);
//       setFormData({ ...formData, profilePic: imageUrl });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
//       <div className={styles.drawerContent}>
//         <span className={styles.closeIcon} onClick={onClose}>
//           &times;
//         </span>

//         <h2>Admin Profile</h2>

//         <div className={styles.picWrapper}>
//           <img
//             src={formData.profilePic}
//             alt="Profile"
//             className={styles.profilePic}
//           />
//           {/* Optional: allow profile pic change */}
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         <label>Name</label>
//         <input type="text" name="name" value={formData.name} readOnly />

//         <label>Email</label>
//         <input type="email" name="email" value={formData.email} readOnly />

//         <label>Role</label>
//         <input type="text" name="role" value={formData.role} readOnly />
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";
import styles from "./AdminProfile.module.css";

interface AdminProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminProfile({ isOpen, onClose }: AdminProfileProps) {
  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <h3>Admin Profile</h3>
        <div className={styles.info}>
          <p><strong>Name:</strong> Admin</p>
          <p><strong>Email:</strong> admin@example.com</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
