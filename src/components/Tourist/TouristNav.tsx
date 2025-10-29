// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import TouristProfile from "./TouristProfile";
// import styles from "./TouristNav.module.css";

// interface TouristNavProps {
//   isTourDetailsPage?: boolean;
//   isWishlistPage?: boolean;
// }

// export default function TouristNav({
//   isTourDetailsPage = false,
//   isWishlistPage = false,
// }: TouristNavProps) {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // Default or user profile image
//   const [profileImage, setProfileImage] = useState("/avatar.png");

//   useEffect(() => {
//     setMounted(true);

//     // Load user profile image if stored
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       if (user?.profileImage) {
//         setProfileImage(user.profileImage);
//       }
//     }
//   }, []);

//   const handleConfirmLogout = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/";
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <>
//       <nav className={styles.navbar}>
//         {/* Logo */}
//         <div className={styles.logo}>
//           <img src="/explorely.png" alt="Explorely Logo" />
//         </div>

//         {/* Navigation Links */}
//         <ul className={styles.navList}>
//           <li>
//             <Link href="/tourist/dashboard">Home</Link>
//           </li>
//           <li>
//             <Link href="/tourist/dashboard#destination">Destination</Link>
//           </li>
//           <li>
//             <Link href="/tourist/dashboard#package">Packages</Link>
//           </li>
//           <li>
//             <Link href="/tourist/review">Reviews</Link>  
//           </li>
//           {!isWishlistPage && (
//             <li>
//               <Link href="/tourist/wishlist" className={styles.wishlistBtn}>
//                 Wishlist
//               </Link>
//             </li>
//           )}
//         </ul>

//         {/* Right Buttons Section */}
//         <div className={styles.rightButtons}>
//           <Link href="/tourist/booking" className={styles.bookingBtn}>
//             Bookings
//           </Link>


//           {!isTourDetailsPage && !isWishlistPage && (
//             <button
//               className={styles.logoutBtn}
//               onClick={() => setShowLogoutConfirm(true)}
//             >
//               Logout
//             </button>
//           )}

//           {/* ✅ Profile Image at the End */}
//           <button
//             className={styles.profileImageBtn}
//             onClick={() => setIsProfileOpen(true)}
//           >
//             <img
//               src={profileImage}
//               alt="Profile"
//               className={styles.profileImage}
//             />
//           </button>
//         </div>
//       </nav>

//       {/* Profile Drawer */}
//       <TouristProfile
//         isOpen={isProfileOpen}
//         onClose={() => setIsProfileOpen(false)}
//       />

//       {/* Logout Confirmation Modal */}
//       {showLogoutConfirm && !isTourDetailsPage && !isWishlistPage && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <h3>Are you sure you want to log out?</h3>
//             <div className={styles.actions}>
//               <button
//                 className={styles.cancel}
//                 onClick={() => setShowLogoutConfirm(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={styles.confirm}
//                 onClick={handleConfirmLogout}
//               >
//                 Log out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TouristProfile from "./TouristProfile";
import styles from "./TouristNav.module.css";

interface TouristNavProps {
  isTourDetailsPage?: boolean;
  isWishlistPage?: boolean;
}

export default function TouristNav({
  isTourDetailsPage = false,
  isWishlistPage = false,
}: TouristNavProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ new state

  const [profileImage, setProfileImage] = useState("/avatar.png");

  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.profileImage) {
        setProfileImage(user.profileImage);
      }
    }
  }, []);

  const handleConfirmLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  if (!mounted) return null;

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/explorely.png" alt="Explorely Logo" />
        </div>

        {/* Hamburger for mobile */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${styles.navList} ${menuOpen ? styles.navListActive : ""}`}
        >
          <li>
            <Link href="/tourist/dashboard" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tourist/dashboard#destination"
              onClick={() => setMenuOpen(false)}
            >
              Destination
            </Link>
          </li>
          <li>
            <Link
              href="/tourist/dashboard#package"
              onClick={() => setMenuOpen(false)}
            >
              Packages
            </Link>
          </li>
          <li>
            <Link href="/tourist/review" onClick={() => setMenuOpen(false)}>
              Reviews
            </Link>
          </li>
          {!isWishlistPage && (
            <li>
              <Link
                href="/tourist/wishlist"
                className={styles.wishlistBtn}
                onClick={() => setMenuOpen(false)}
              >
                Wishlist
              </Link>
            </li>
          )}
        </ul>

        {/* Right Buttons Section */}
        <div className={styles.rightButtons}>
          <Link href="/tourist/booking" className={styles.bookingBtn}>
            Bookings
          </Link>

          {!isTourDetailsPage && !isWishlistPage && (
            <button
              className={styles.logoutBtn}
              onClick={() => setShowLogoutConfirm(true)}
            >
              Logout
            </button>
          )}

          {/* Profile */}
          <button
            className={styles.profileImageBtn}
            onClick={() => setIsProfileOpen(true)}
          >
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
          </button>
        </div>
      </nav>

      {/* Profile Drawer */}
      <TouristProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && !isTourDetailsPage && !isWishlistPage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Are you sure you want to log out?</h3>
            <div className={styles.actions}>
              <button
                className={styles.cancel}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button className={styles.confirm} onClick={handleConfirmLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
