
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import TouristNavbar from "@/components/Tourist/TouristNav";
// import TouristFooter from "@/components/Tourist/TouristFot";
// import TouristDashboard from "@/components/Tourist/TouristDashboard";
// import styles from "./touristdas.module.css";

// export default function TouristDashboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [showMoreDestinations, setShowMoreDestinations] = useState(false);

//   const [destinations, setDestinations] = useState<string[]>([]);
//   const [allTours, setAllTours] = useState<any[]>([]);
//   const [filteredTours, setFilteredTours] = useState<any[]>([]);

//   // filters
//   const [duration, setDuration] = useState("");
//   const [budget, setBudget] = useState("");
//   const [category, setCategory] = useState("");
//   const [selectedDestination, setSelectedDestination] = useState("");

//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   // ✅ Fetch destinations
//   useEffect(() => {
//     fetch("http://localhost:4000/tours/destinations")
//       .then((res) => res.json())
//       .then(setDestinations)
//       .catch((err) => console.error("Error fetching destinations:", err));
//   }, []);

//   // ✅ Fetch all tours
//   useEffect(() => {
//     fetch("http://localhost:4000/tours/public/all")
//       .then((res) => res.json())
//       .then(setAllTours)
//       .catch((err) => console.error("Error fetching tours:", err));
//   }, []);

//   // ✅ Apply filters
// const applyFilters = async () => {
//   const params: Record<string, string> = {};
//   if (selectedDestination) params.destination = selectedDestination;
//   if (duration) params.duration = duration;
//   if (budget) params.budget = budget;
//   if (category) params.category = category;

//   const query = new URLSearchParams(params).toString();

//   try {
//     const res = await fetch(`http://localhost:4000/tours/filter?${query}`);
//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({}));
//       throw new Error(errorData.error || "Failed to fetch filtered tours");
//     }

//     const data = await res.json();
//     setFilteredTours(data);

//     setFilterOpen(false);

//     // ✅ Smooth scroll to dashboard
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   } catch (err) {
//     console.error("Error applying filters:", err);
//     alert((err as Error).message);
//   }
// };



//   // ✅ Auth check
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user") || "{}");

//     if (!token || user.role !== "tourist") {
//       router.replace("/login");
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

//   if (loading) return null;

//   const toursToShow = filteredTours.length > 0 ? filteredTours : allTours;

//   return (
//     <div>
//       <TouristNavbar />

//       <section className={styles.heroSection}>
//   <video autoPlay muted loop playsInline className={styles.videoBg}>
//     <source src="/tour.mp4" type="video/mp4" />
//   </video>

//   <div className={styles.heroContent}>
//     <h1>DREAM DESTINATIONS</h1>
//     <p>Grab! The best deal for your trip</p>

//     <div className={styles.searchContainer}>
//       {/* Filter toggle */}
//       <button
//         className={styles.filterBtn}
//         onClick={() => setFilterOpen(!filterOpen)}
//       >
//         <img src="/filter.png" alt="Filter" className={styles.filterImg} />
//         {filterOpen ? "Hide Filter" : "Show Filter"}
//       </button>

//       {/* 🔍 Search bar */}
//       <div className={styles.searchWrapper}>
//         <input
//           type="text"
//           value={selectedDestination}
//           onChange={(e) => setSelectedDestination(e.target.value)}
//           placeholder="Search destinations, tours..."
//           className={styles.searchInput}
//         />
//         <button
//           className={styles.searchBtn}
//           onClick={applyFilters} // ✅ trigger filter when searching
//         >
//           <img src="/search.png" alt="Search" className={styles.searchImg} />
//         </button>
//       </div>
//     </div>
//   </div>
// </section>


//       {/* Filter Sidebar */}
//       {filterOpen && (
//         <>
//           <div
//             className={styles.filterBackdrop}
//             onClick={() => setFilterOpen(false)}
//           ></div>

//           <div className={styles.filterDropdown}>
//             <h3>Filter Your Trip</h3>

//             {/* Duration */}
//             <div className={styles.filterSection}>
//               <label>Duration (Days/Nights):</label>
//               <input
//                 type="text"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 placeholder="e.g. 3 Days / 4 Nights"
//               />
//             </div>

//             {/* Destinations */}
//             <div className={styles.filterSection}>
//               <label>Destinations:</label>
//               <div className={styles.destinationsList}>
//                 {(showMoreDestinations
//                   ? destinations
//                   : destinations.slice(0, 7)
//                 ).map((d, i) => (
//                   <div
//                     key={i}
//                     className={`${styles.destinationItem} ${selectedDestination === d ? styles.active : ""
//                       }`}
//                     onClick={() => setSelectedDestination(d)}
//                   >
//                     {d}
//                   </div>
//                 ))}
//               </div>
//               <div
//                 className={styles.viewMoreText}
//                 onClick={() => setShowMoreDestinations(!showMoreDestinations)}
//               >
//                 {showMoreDestinations ? "View Less" : "View More"}
//               </div>
//             </div>

//             {/* Budget */}
//             <div className={styles.filterSection}>
//   <label>Budget:</label>
//   <select
//     value={budget}
//     onChange={(e) => setBudget(e.target.value)}  // ✅ update state
//   >
//     <option value="">Select Budget</option>
//     <option value="5000-10000">₹5,000 - ₹10,000</option>
//     <option value="10000-20000">₹10,000 - ₹20,000</option>
//     <option value="20000-30000">₹20,000 - ₹30,000</option>
//     <option value="30000-40000">₹30,000 - ₹40,000</option>
//   </select>
// </div>


//             {/* Category */}
//             <div className={styles.filterSection}>
//               <label>Category:</label>
//               <div className={styles.categoryOptions}>
//                 {[
//                   "Family Package",
//                   "Honeymoon Package",
//                   "Solo Tour Package",
//                   "Hill-Station Package",
//                   "Luxury Package",
//                   "Other",
//                 ].map((c, i) => (
//                   <div
//                     key={i}
//                     className={`${styles.categoryItem} ${category === c ? styles.active : ""
//                       }`}
//                     onClick={() => setCategory(c)}
//                   >
//                     {c}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button className={styles.applyFilterBtn} onClick={applyFilters}>
//               Apply Filters
//             </button>
//           </div>
//         </>
//       )}

//       <div className={styles.popularSection} id="destination">
//         <h2 className={styles.popularHeading}>Popular Destinations</h2>
//         <div className={styles.scrollWrapper}>
//           <div className={styles.scrollContent}>
//             <div className={styles.popularItem}>
//               <img src="/paris des.jpeg" alt="Paris" /><p>PARIS</p></div> <div className={styles.popularItem}>
//               <img src="/goa des.jpeg" alt="Goa" /><p>GOA</p></div> <div className={styles.popularItem}>
//               <img src="/ledak des.jpeg" alt="Ladakh" /><p>LADAKH</p></div> <div className={styles.popularItem}>
//               <img src="/agra des.jpeg" alt="Agra" /><p>AGRA</p></div> <div className={styles.popularItem}>
//               <img src="/italy des.jpeg" alt="Italy" /><p>ITALY</p></div> <div className={styles.popularItem}>
//               <img src="/malasia des.jpeg" alt="Malaysia" /><p>MALAYSIA</p></div> <div className={styles.popularItem}>
//               <img src="/kerala des.jpeg" alt="Kerala" /><p>KERALA</p></div> <div className={styles.popularItem}>
//               <img src="/rajastan des.jpeg" alt="rajastan" /><p>RAJASTHAN</p></div> <div className={styles.popularItem}>
//               <img src="/maldives des.jpeg" alt="Maldives" /><p>MALDIVES</p></div> <div className={styles.popularItem}>
//               <img src="/varanasi des.jpeg" alt="Varanasi" /><p>VARANASI</p></div>
//             {/* Duplicate set for seamless loop */}
//             <div className={styles.popularItem}><img src="/paris des.jpeg" alt="Paris" /><p>PARIS</p></div>
//             <div className={styles.popularItem}><img src="/goa des.jpeg" alt="Goa" /><p>GOA</p></div>
//             <div className={styles.popularItem}><img src="/ledak des.jpeg" alt="Ladakh" /><p>LADAKH</p></div>
//             <div className={styles.popularItem}><img src="/agra des.jpeg" alt="Agra" /><p>AGRA</p></div>
//             <div className={styles.popularItem}><img src="/italy des.jpeg" alt="Italy" /><p>ITALY</p></div>
//             <div className={styles.popularItem}><img src="/malasia des.jpeg" alt="Malaysia" /><p>MALAYSIA</p></div>
//             <div className={styles.popularItem}><img src="/kerala des.jpeg" alt="Kerala" /><p>KERALA</p></div>
//             <div className={styles.popularItem}><img src="/rajastan des.jpeg" alt="rajastan" /><p>RAJASTHAN</p></div>
//             <div className={styles.popularItem}><img src="/maldives des.jpeg" alt="Maldives" /><p>MALDIVES</p></div>
//             <div className={styles.popularItem}><img src="/varanasi des.jpeg" alt="Varanasi" /><p>VARANASI</p></div> </div>
//         </div>
//       </div>


//       <section className={styles.dashboardBody} ref={scrollRef}>
//   <TouristDashboard tours={toursToShow} />
// </section>


//       <TouristFooter />
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TouristNavbar from "@/components/Tourist/TouristNav";
import TouristFooter from "@/components/Tourist/TouristFot";
import TouristDashboard from "@/components/Tourist/TouristDashboard";
import styles from "./touristdas.module.css";

export default function TouristDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showMoreDestinations, setShowMoreDestinations] = useState(false);

  const [destinations, setDestinations] = useState<string[]>([]);
  const [allTours, setAllTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);

  // filters
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ Fetch destinations
  useEffect(() => {
    fetch("http://localhost:4000/tours/destinations")
      .then((res) => res.json())
      .then(setDestinations)
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  // ✅ Fetch all tours
  useEffect(() => {
    fetch("http://localhost:4000/tours/public/all")
      .then((res) => res.json())
      .then(setAllTours)
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  // ✅ Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "tourist") {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  // ✅ Live search with regex
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredTours([]);
      return;
    }

    const regex = new RegExp(`^${value}`, "i"); // starts-with, case-insensitive
    const filtered = allTours.filter((tour) => regex.test(tour.destination));
    setFilteredTours(filtered);
  };

  // ✅ Apply filters (including destination selection)
  const applyFilters = async () => {
    const params: Record<string, string> = {};
    if (searchTerm) params.destination = searchTerm;
    if (duration) params.duration = duration;
    if (budget) params.budget = budget;
    if (category) params.category = category;

    const query = new URLSearchParams(params).toString();

    try {
      const res = await fetch(`http://localhost:4000/tours/filter?${query}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch filtered tours");
      }

      const data = await res.json();
      setFilteredTours(data);

      setFilterOpen(false);

      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      console.error("Error applying filters:", err);
      alert((err as Error).message);
    }
  };

  const toursToShow = filteredTours.length > 0 ? filteredTours : allTours;

  return (
    <div>
      <TouristNavbar />

      <section className={styles.heroSection}>
        <video autoPlay muted loop playsInline className={styles.videoBg}>
          <source src="/tour.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroContent}>
          <h1>DREAM DESTINATIONS</h1>
          <p>Grab! The best deal for your trip</p>

          <div className={styles.searchContainer}>
            <button
              className={styles.filterBtn}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <img src="/filter.png" alt="Filter" className={styles.filterImg} />
              {filterOpen ? "Hide Filter" : "Show Filter"}
            </button>

            <div className={styles.searchWrapper}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search destinations, tours..."
                className={styles.searchInput}
              />
              <button
                className={styles.searchBtn}
                onClick={applyFilters}
              >
                <img src="/search.png" alt="Search" className={styles.searchImg} />
              </button>


            </div>
          </div>
          {/* ✅ Live search suggestions */}
          {searchTerm && filteredTours.length > 0 && (
            <ul className={styles.searchResults}>
              {filteredTours.map((tour) => (
                <li
                  key={tour._id}
                  onClick={() => router.push(`/tourist/tour/${tour._id}`)}
                  className={styles.searchResultItem}
                >
                  {tour.destination} - {tour.packageType}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Filter Sidebar */}
      {filterOpen && (
        <>
          <div
            className={styles.filterBackdrop}
            onClick={() => setFilterOpen(false)}
          ></div>

          <div className={styles.filterDropdown}>
            <h3>Filter Your Trip</h3>

            <div className={styles.filterSection}>
              <label>Duration (Days/Nights):</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 3 Days / 4 Nights"
              />
            </div>

            <div className={styles.filterSection}>
              <label>Destinations:</label>
              <div className={styles.destinationsList}>
                {(showMoreDestinations
                  ? destinations
                  : destinations.slice(0, 7)
                ).map((d, i) => (
                  <div
                    key={i}
                    className={`${styles.destinationItem} ${searchTerm === d ? styles.active : ""
                      }`}
                    onClick={() => setSearchTerm(d)}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div
                className={styles.viewMoreText}
                onClick={() => setShowMoreDestinations(!showMoreDestinations)}
              >
                {showMoreDestinations ? "View Less" : "View More"}
              </div>
            </div>

            <div className={styles.filterSection}>
              <label>Budget:</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Select Budget</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="20000-30000">₹20,000 - ₹30,000</option>
                <option value="30000-40000">₹30,000 - ₹40,000</option>
              </select>
            </div>

            <div className={styles.filterSection}>
              <label>Category:</label>
              <div className={styles.categoryOptions}>
                {[
                  "Family Package",
                  "Honeymoon Package",
                  "Solo Tour Package",
                  "Hill-Station Package",
                  "Luxury Package",
                  "Other",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`${styles.categoryItem} ${category === c ? styles.active : ""
                      }`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.applyFilterBtn} onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </>
      )}

      <div className={styles.popularSection} id="destination">
        <h2 className={styles.popularHeading}>Popular Destinations</h2>
        <div className={styles.scrollWrapper}>
          <div className={styles.scrollContent}>
            <div className={styles.popularItem}>
              <img src="/paris des.jpeg" alt="Paris" /><p>PARIS</p></div> <div className={styles.popularItem}>
              <img src="/goa des.jpeg" alt="Goa" /><p>GOA</p></div> <div className={styles.popularItem}>
              <img src="/ledak des.jpeg" alt="Ladakh" /><p>LADAKH</p></div> <div className={styles.popularItem}>
              <img src="/agra des.jpeg" alt="Agra" /><p>AGRA</p></div> <div className={styles.popularItem}>
              <img src="/italy des.jpeg" alt="Italy" /><p>ITALY</p></div> <div className={styles.popularItem}>
              <img src="/malasia des.jpeg" alt="Malaysia" /><p>MALAYSIA</p></div> <div className={styles.popularItem}>
              <img src="/kerala des.jpeg" alt="Kerala" /><p>KERALA</p></div> <div className={styles.popularItem}>
              <img src="/rajastan des.jpeg" alt="rajastan" /><p>RAJASTHAN</p></div> <div className={styles.popularItem}>
              <img src="/maldives des.jpeg" alt="Maldives" /><p>MALDIVES</p></div> <div className={styles.popularItem}>
              <img src="/varanasi des.jpeg" alt="Varanasi" /><p>VARANASI</p></div>
            {/* Duplicate set for seamless loop */}
            <div className={styles.popularItem}><img src="/paris des.jpeg" alt="Paris" /><p>PARIS</p></div>
            <div className={styles.popularItem}><img src="/goa des.jpeg" alt="Goa" /><p>GOA</p></div>
            <div className={styles.popularItem}><img src="/ledak des.jpeg" alt="Ladakh" /><p>LADAKH</p></div>
            <div className={styles.popularItem}><img src="/agra des.jpeg" alt="Agra" /><p>AGRA</p></div>            <div className={styles.popularItem}><img src="/italy des.jpeg" alt="Italy" /><p>ITALY</p></div>
            <div className={styles.popularItem}><img src="/malasia des.jpeg" alt="Malaysia" /><p>MALAYSIA</p></div>
            <div className={styles.popularItem}><img src="/kerala des.jpeg" alt="Kerala" /><p>KERALA</p></div>
            <div className={styles.popularItem}><img src="/rajastan des.jpeg" alt="rajastan" /><p>RAJASTHAN</p></div>
            <div className={styles.popularItem}><img src="/maldives des.jpeg" alt="Maldives" /><p>MALDIVES</p></div>
            <div className={styles.popularItem}><img src="/varanasi des.jpeg" alt="Varanasi" /><p>VARANASI</p></div> </div>
        </div>
      </div>

      <section className={styles.dashboardBody} ref={scrollRef}>
        <TouristDashboard tours={toursToShow} />
      </section>


      <TouristFooter />
    </div>
  );
}
