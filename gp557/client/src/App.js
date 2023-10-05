import logo from './logo.svg';
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const[authenticated, setAuthenticated] = useState();
  
  const username = useRef(null);

  let props = {
    user: null,
    handleLogout: handleLogout
  }
  
  return (
    <Router>
        {authenticated ? (
            <>
                <Header {...props} />
                <Routes>
                    <Route exact path='/create_quiz' element={<CreateQuiz {...props} />} />
                    <Route exact path="/create_quiz/test" element={<CreateTest {...props} />} />
                    <Route exact path='/chat' element={<DirectMessagingPage {...props} />} />
                    <Route exact path='/' element={<MainFeed {...props} />} />
                    <Route exact path='/profile/:username' element={<ProfilePage {...props} />} />
                    <Route exact path='/leaderboard' element={<Leaderboard {...props} />} />
                    <Route path='/quiz/:id' element={<QuizInfo {...props} />} />
                    <Route exact path='*' element={<Navigate to='/' />} />
                </Routes>
            </>
        ) : (
            <>
                <Routes>
                    <Route exact path='/login' element={<Login handleLogin={handleLogin} />} />
                    <Route exact path='/register' element={<Register handleLogin={handleLogin} />} />
                    <Route exact path='*' element={<Navigate to='/login' />} />
                </Routes>
            </>
        )}
    </Router>
  );
}

export default App;
