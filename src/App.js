/* eslint-disable */

import React, {useContext, useState} from 'react';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap'
import './App.css';
import data from './data';
import Detail from './Detail';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom'

let 재고context = React.createContext();

function App() {

  let [옷,옷변경] = useState(data);
  let [재고,재고변경] = useState([10,11,12]);

  return (
    <div className="App">

      {/* 네브바 */}
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand href="#home">BLANCO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as = {Link} to ="/">Home</Nav.Link>
            <Nav.Link as = {Link} to="/detail">DETAIL</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>

        {/* 메인 페이지 */}
        <Route exact path="/">

          {/* 대문로고 */}
          <Jumbotron className="background">
            <h1>30% Season OFF</h1>
            {/* <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p> */}
          </Jumbotron>

          {/* 상품 리스트 */}
          <div className="container">
            
            <재고context.Provider value={재고}>

            <div className="row">
              
              {
                옷.map((a,i)=>{
                  return(
                    <Card 상품={a} key={i}/>
                  )
                })
              }

            </div>

            </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{ // 성공
                console.log(result.data);
                옷변경([...옷, ...result.data]);
              }) 
              .catch(()=>{ // 실패
                console.log('실패염');
              }) 
            }}>더보기</button>
          </div>

        </Route>

        {/* 상품상세 페이지 */}
        <Route path="/detail/:id">
          <Detail 옷={옷} 재고={재고} 재고변경={재고변경}/>
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을때</div>
        </Route>

      </Switch>

      
    </div>
  );
}


function Card(props) {

  let 재고 = useContext(재고context);

  return(
    <div className="col-md-4">
      <img src={props.상품.img} width="100%"/>
      <h4>{props.상품.title}</h4>
      <p>{props.상품.content} & {props.상품.price}</p>
      <Test></Test>
    </div>
  )
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고}</p>
}


export default App;
