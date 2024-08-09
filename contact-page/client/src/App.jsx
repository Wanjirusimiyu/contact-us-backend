import React from 'react';
import ContactUs from './Pages/ContactUs';
import FeaturedRecipes from './Pages/FeaturedRecipe';
import ExploreRecipes from './Pages/ExploreRecipes';
// import Recipe from './Recipe';

function App() {
  return (
    <div>
      {/* <Recipe /> */}
      <ContactUs />
      <FeaturedRecipes/>
      <ExploreRecipes />
    </div>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// // import ContactUs from './Pages/ContactUs.jsx';
// // import Navbar from './Components/Navbar.jsx'; 
// import FeaturedRecipes from './pages/FeaturedRecipe';
// import ExploreRecipes from './Pages/ExploreRecipes';

// // function App() {
// //   return (
// //     <Router>
// //       <div>
// //         <Navbar />
// //         <Routes>
// //           <Route path="/contactus" element={<ContactUs />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
