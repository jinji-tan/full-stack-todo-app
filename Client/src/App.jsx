import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import View from "./components/View";

const App = () => {
  const [page, setPage] = useState('login')

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) return setPage('main');
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'login': return <Login setPage={setPage} />
      case 'register': return <Register setPage={setPage} />
      case 'main': return <Main setPage={setPage} />
      case 'view': return <View tasks={tasks} setPage={setPage} />

      default: return <Login setPage={setPage} />
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  )
}



export default App;