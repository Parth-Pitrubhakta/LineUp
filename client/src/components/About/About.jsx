import React from 'react'
import { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const [userData ,setUserData] = useState("");
    const CalAboutPage = async () =>{
        try { 
            console.log('callabout')
            const res = await fetch("/about");

              const data =await res.json();
              console.log(data)
              setUserData(data);
            //   setUserData(data._id);
            //   console.log(userData); 
            //   console.log(userData.data._id)
              if(!res.status === 200){
                throw new Error(res.error);
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }

useEffect(()=>{
    console.log('useeffect')
    CalAboutPage();
},[]);

  return (
    <>
    <div className='container'>
        <form  method="get">
            <div className='row'>
                <div className='col-md-6 pl-2'>
                    <div className='profiletab' id='mytab'>
                        <div className='show active' id='tabpanel'>
                            <div className='row mt-3'>
                                <div className='col-md-8'>
            {/* <h1>{userData}</h1> */}
                                <label>Name</label>
                                </div>
                                <div className='col-md-4'>
                                {/* {userData.name} */}
                                Name
                                </div>

                            </div>
                            <div className='row mt-3'>
                                <div className='col-md-8'>
                                <label>Email</label>
                                </div>
                                <div className='col-md-4'>
                                {/* {userData.email} */}
                                Email
                                </div>
                            <div className='row mt-3'>
                                <div className='col-md-8'>
                                <label>USERID</label>
                                </div>
                                <div className='col-md-4'>
                                765432456
                                </div>

                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default About