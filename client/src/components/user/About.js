import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const About = () => {
  const [userData, setUserData] = useState({});
  console.log('about component:', userData)
  const navigate = useNavigate();

  useEffect(() => {

    const callAboutPage = async () => {
      let aboutURL = `${process.env.REACT_APP_BASE_URL}/about`
      try {
        const response = await axios.get(aboutURL ,{ withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.log(error.message);
        navigate('/login');
      }
    };

    callAboutPage();
  }, [navigate]);

  const { _id, name, email, work, phone } = userData;

  return (
    <div className='mt-md-5 pt-5'>
      <section className='my-5 pt-5'>
        <div className="container p-3 shadow">
          <div className="row">
            <h1 className='text-center'>About</h1>
            <div className="col-10 mx-auto">
              <div className="row mt-4">
                <div className="col-md-6 col-12 mb-3">
                  <h5>User ID:</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>{_id}</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>User Name:</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>{name}</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>Email:</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>{email}</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>Work:</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>{work}</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>Phone:</h5>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <h5>{phone}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};