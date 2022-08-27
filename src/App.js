import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import bg from './dark-brown-wood-table.jpg';
import './App.css';

// import Tip from './components/tip';

// function Home() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/tips">Tip Calculator</Link>
//         </li>
//         <li>
//           <a className="App-link" href="https://www.canadahelps.org/en/explore/popular-now/" target="_blank" rel="noopener noreferrer">
//             Donate to someone in need
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

function App() {
  const divStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
  };

  return (
    <div className="App">
      <header className="App-header" style={divStyle}>
        <h1>BJ Blayney</h1>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tips" element={<Tip />} />
        </Routes> */}

        <Tab.Group>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'rounded-lg px-3 py-2 font-medium backdrop-blur-sm bg-white/30 text-slate-900'
                      : 'rounded-lg px-3 py-2 text-slate-700 font-medium hover:backdrop-blur-sm hover:bg-white/30 hover:text-slate-900'
                  }
                >
                  Camera 1
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'rounded-lg px-3 py-2 font-medium backdrop-blur-sm bg-white/30 text-slate-900'
                      : 'rounded-lg px-3 py-2 text-slate-700 font-medium hover:backdrop-blur-sm hover:bg-white/30 hover:text-slate-900'
                  }
                >
                  Camera 2
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>1</Tab.Panel>
            <Tab.Panel>2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </header>
    </div>
  );
}

export default App;
