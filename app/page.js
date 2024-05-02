"use client"
import { useEffect, useState } from "react";
import data from "../data/comments.json";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mode, setMode] = useState('light-mode');
  const [key, setKey] = useState('coding');
  const [show, setShow] = useState(false);
  const [masterInfo, setMasterInfo] = useState({})

  const handleClose = () => {
    setMasterInfo({})
    setShow(false)
  };
  const handleShow = (info) => {
    console.log(info)
    setMasterInfo(info)
    setShow(true)
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  const CardRow = (data) => {
    let info = data.data;
    return (
      <Card className="mb-2 m-auto w-50">
        <Card.Body>
          <Card.Img className="w-1/4 mb-4 p-3 inline-block align-top" src={info.product_info.amazon.thumbnail} />
          <div className="inline-block w-3/4 justify-normal">
            <Card.Title>
              <Link className=" text-blue-400" target="_blank" href={info.product_info.amazon.link}>{info.name}</Link>
            </Card.Title>
            <Card.Subtitle>{info.product_info.amazon.currency} {info.product_info.amazon.price}</Card.Subtitle>
            <Card.Text className="mt-3" onClick={() => handleShow(info)}>
              {info.description}
              {/* <span className="block mt-4">See Reviews</span> */}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <main className={`min-h-screen flex-col items-center justify-between p-5 ${mode}`}>
      <div className="float-right">
        <div className="toggle-container cursor-pointer" onClick={toggleMode}>
          <span className={`switch ${mode}`}></span>
        </div>
      </div>
      <div className="mb-20">
        <h1 className="">KeyboardStation</h1>
        <h3>One-stop shop for all your typing needs</h3>
        {/* <p>Created By @azazel</p> */}
      </div>
      <div>
        {/* <div>
          <label class="checkbox" className="block">
            <input type="checkbox" name="coding" />
            <span className="checkmark mt-0 align-top"> Coding</span>
          </label>
          <label class="checkbox" className="block">
            <input type="checkbox" name="gaming" />
            <span className="checkmark mt-0 align-top"> Gaming</span>
          </label>
        </div> */}
        {/* {data.Mechanical_Keyboards.Coding && data.Mechanical_Keyboards.Coding.length > 0 && (
          data.Mechanical_Keyboards.Coding.map((value, index) => (
            <CardRow key={`coding_${index}`} data={value} />
          ))
        )}
        {data.Mechanical_Keyboards.Gaming && data.Mechanical_Keyboards.Gaming.length > 0 && (
          data.Mechanical_Keyboards.Gaming.map((value, index) => (
            <CardRow key={`gaming_${index}`} data={value} />
          ))
        )} */}
        <h2 className="font-bold mb-3 text-xl">Browse by use cases</h2>
        <Tabs
          id="category-tab"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4"
          justify
        >
          <Tab eventKey="coding" title="Coding">
            {data.Mechanical_Keyboards.Coding && data.Mechanical_Keyboards.Coding.length > 0 && (
              data.Mechanical_Keyboards.Coding.map((value, index) => (
                <CardRow key={`coding_${index}`} data={value} />
              ))
            )}
          </Tab>
          <Tab eventKey="gaming" title="Gaming">
            {data.Mechanical_Keyboards.Gaming && data.Mechanical_Keyboards.Gaming.length > 0 && (
              data.Mechanical_Keyboards.Gaming.map((value, index) => (
                <CardRow key={`gaming_${index}`} data={value} />
              ))
            )}
          </Tab>
          <Tab eventKey="writing" title="Writing">
            {data.Mechanical_Keyboards.Gaming && data.Mechanical_Keyboards.Gaming.length > 0 && (
              data.Mechanical_Keyboards.Gaming.map((value, index) => (
                <CardRow key={`writing_${index}`} data={value} />
              ))
            )}
          </Tab>
          <Tab eventKey="multimedia" title="Multimedia">
            {data.Mechanical_Keyboards.Gaming && data.Mechanical_Keyboards.Gaming.length > 0 && (
              data.Mechanical_Keyboards.Gaming.map((value, index) => (
                <CardRow key={`multimedia_${index}`} data={value} />
              ))
            )}
          </Tab>
        </Tabs>

        <Modal show={show} onHide={handleClose} className={`modal-lg ${mode}-modal`}>
          <Modal.Header closeButton>
            <Modal.Title>{`Reviews on ${masterInfo.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {masterInfo.hasOwnProperty('comments') && masterInfo.comments.hasOwnProperty('positive_comments') && masterInfo.comments.positive_comments.length > 0 && (
              masterInfo.comments.positive_comments.map((value, index) => (
                value.comment !== '' &&
                <>
                  <h2>Positive</h2>
                  <Card key={index} className="mb-2 mt-2 m-auto">
                    <Card.Body>
                      <Card.Text>
                        {value.comment}
                      </Card.Text>
                      <Card.Text><small>{`Posted by ${value.author_ID} on ${value.subreddit_ID}`}</small></Card.Text>
                    </Card.Body>
                  </Card>
                </>
              ))
            )}{masterInfo.hasOwnProperty('comments') && masterInfo.comments.hasOwnProperty('negative_comments') && masterInfo.comments.negative_comments.length > 0 && (
              masterInfo.comments.negative_comments.map((value, index) => (
                value.comment !== '' &&
                <>
                  <h2>Negative</h2>
                  <Card key={index} className="mb-2 mt-2 m-auto">
                    <Card.Body>
                      <Card.Text>
                        {value.comment}
                      </Card.Text>
                      <Card.Text><small>{`Posted by ${value.author_ID} on ${value.subreddit_ID}`}</small></Card.Text>
                    </Card.Body>
                  </Card>
                </>
              ))
            )}
          </Modal.Body>
        </Modal>
        <footer className=" bottom-0">
          <p className="float-right">Powered by Astermave.</p>
        </footer>
      </div>
    </main>
  );
}
