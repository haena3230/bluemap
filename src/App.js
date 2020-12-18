
import MainPage from './Pages/MainPage'
import CheckPage from './Pages/MainPage/CheckPage'
import ScorePage from './Pages/MainPage/ScorePage'
import MapPage from './Pages/MapPage'
import BoardPage from './Pages/BoardPage'
import BoardInPage from './Pages/BoardPage/BoardInPage'
import BoardWritePage from './Pages/BoardPage/BoardWritePage'
import BoardDetailPage from './Pages/BoardPage/BoardDetailPage'
import Pages from './Pages'
import {Route} from 'react-router-dom';



function App() {
  return(
    <div>
      <Route path="/" component={MainPage} exact/>
      <Route path="/check" component={CheckPage} exact/>
      <Route path="/check/:score" component={ScorePage}/>
      <Route path="/map" component={MapPage}/>
      <Route path="/board" component={BoardPage} exact/>
      <Route path="/board/page" component={BoardInPage} exact/>
      <Route path="/board/page/:postId" component={BoardDetailPage}/>
      <Route path="/board/write" component={BoardWritePage}/>
      <Route path="/" component={Pages}/>
    </div>
    
  )
}

export default App;
