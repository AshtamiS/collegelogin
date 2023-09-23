import React from 'react'
import './Body.css'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import axios from 'axios';
import service from '../Services/Service';
// import service from './Services/Service';

function App() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();



    const [name, setName] = useState(true);
    const [states, setState] = useState([])
    // const [selected_state,setSelected_state]=useState("")
    const [selectState, setSelectState] = useState(" ")
    const [city, setCity] = useState({ "state": "", "districts": [] })
    const [selected_city, setSelected_city] = useState("")
    const [children, setChildren] = useState([])
    const [addchild, setAddChild] = useState(false)
    const [submit, setsubmit] = useState()

    useEffect(() => {
        statelist()

    }, [])
    const statelist = async () => {
        await fetch("/states-and-districts.json").then(res => res.json()).then(json => {
            console.log(json)
            setState(json.states)
        })
    }
    const marital_status = (x) => {
        setName(x);
        console.log(name);
    };
    const updateState = (e) => {

       
        let newcity
        for (let i of states) {
            console.log("mmm", i);
            if (i.state == e.target.value) {
                console.log("abcd");
                newcity = i
                break
            }
            newcity = { "state": "", "districts": [] }
        }
        console.log("abvvvv", newcity);
        setCity(newcity)

        setSelectState(e.target.value)

    }
    const check = () => {
        console.log(city);
    }
    const updatechild = (name, index) => {
      console.log(children);
     
        let cur_data = children
        console.log(name);
        cur_data[index].name = name
          setChildren(cur_data)
          
    }



    const addChildfn = () => {
          setChildren(old => [...old, { "name": "", "date": "" }])
        console.log(children);
       
    }
    const removechild = (k) => {
        //  setChildren(children.filter((index)=>index!=k))
        console.log(k);
        setChildren([
            ...children.slice(0, k),
            ...children.slice(k + 1, children.length)
        ]);
    }





    const onSubmit = (data) => {
       console.log(data)
       console.log(children);
       var marital_status=false
       if(data.spname!="")  marital_status=true
        let abc={
          name:data.yourname,
          phonenum:data.contactnumber,
          email:data.email,
          birthday:data.birthday,
          profession:data.profession,
          employment:data.empstatus,
          addInd:data.add1,
          addUae:data.add2,
          degree:data.degree,
          marital:{status:marital_status,spouse:data.spname},
          study:data.study,
          yop:data.yop
        }
        service.post("/adduser",abc).then(res=>{
          if(res.status){
            alert("successfull")
            reset()
          }
          else
            alert("email already exist")
        })
        
        
    }
   

    return (
        <div>


            <div
                style={{ backgroundColor: "rgb(237, 163, 5)", top: '100px', color: "white" }}
            >
                <div className="row mdtitle"
                    style={{ backgroundColor: "rgb(237, 163, 5)", padding: "50px", color: "white" }}
                >

                    <div className=" col-sm-12 col-md-6 mt-5 mb-5">
                    <h1 className="textwelcome ">WELCOME TO ALUMNI ASSOCIATION</h1>
                    <h2 className="fw-bold">Fatima Mata National College</h2>


                    </div>


                </div>
            </div>

            <div className='image' style={{ color: "white", padding: "10%", border: "1px" }}>
                <form style={{ border: "2px solid " }} onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mt-5 pe-4 ps-4 p-2">

                        <div className=" col-sm-12 col-md-5">
                            <h4>Name</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    color: "white"

                                }}
                            >
                                <input
                                 
                                    {...register("yourname", { required: "Name is required", pattern: { value: /^[a-zA-Z\s]+$/, message: "Name field only contains upper and lower cases" } })}
                                    placeholder="Enter your name"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}

                                ></input>

                            </div>
                            <div className='row'>{errors.yourname && (<label className='label'>{errors.yourname.message}</label>)}</div>
                            
                        </div>
                        <div className=" col-sm-12 col-md-4">
                            <h4>Contact Number</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("contactnumber", { required: "Contact number is required", pattern: { value: /^[0-9]+$/, message: "Invalid phone number" } })}
                                    placeholder="Enter your contact number"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            <div className='row'>{errors.contactnumber && (<label className='label'>
                                {errors.contactnumber.message}</label>)}</div>

                        </div>
                    </div>
                    <div className="row mt-2 pe-4 ps-4 p-2">


                        <div className=" col-sm-12 col-md-5">
                            <h4>Your Email</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    type='email'
                                    {...register("email", { required: "Emai id is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email id" } })}
                                    placeholder="Enter your email (eg:-abc@gmail.com)"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            {errors.email && (<label className='label'>{errors.email.message}</label>)}

                        </div>
                        <div className=" col-sm-12 col-md-4">
                            <h4>Your Profession</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("profession", { required: "Profession is required", pattern: { value: /^[a-zA-Z\s]+$/, message: "profession is invalid" } })}
                                    placeholder="Enter your Profession"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            {errors.profession && (<label className='label'>{errors.profession.message}</label>)}

                        </div>
                    </div>
                    <div className="row mt-2 pe-4 ps-4 p-2">


                        <div className=" col-sm-12 col-md-5">
                            <h4>Employee status</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("empstatus", { required: "Employee stauts is required", pattern: { value: /^[a-zA-Z\s]+$/, message: "Employee status is invalid" } })}
                                    placeholder="Enter your professional status"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            {errors.empstatus && (<label className='label'>{errors.empstatus.message}</label>)}

                        </div>
                        <div className=" col-sm-12 col-md-4">
                            <h4>Birthday</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("dob", { required: "Date of birth required" })}
                                    type="date"
                                    placeholder="mm/dd/yyyy"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            {errors.dob && (<label className='label'>{errors.dob.message}</label>)}

                        </div>
                    </div>
                    <div className="row mt-2 pe-4 ps-4 p-2">


                        <div className=" col-sm-12 col-md-3">
                            <h4>Address in India</h4>

                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("add1", { required: "Address is required" })}
                                    placeholder="Enter your address in India"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                        color: "white"
                                    }}
                                ></input>
                            </div>
                            {errors.add1 && (<label className='label'>{errors.add1.message}</label>)}

                        </div>


                        <div className=" mt-4 col-sm-12 col-md-3">
                            <h4></h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <select

                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",

                                    }}

                                    onChange={(e) => updateState(e)}>
                                    <option >Select state </option>


                                    {

                                        states.map(state => (
                                            <option >{state.state}</option>
                                        ))
                                    }

                                </select>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 mt-4">
                            <h4></h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <select
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }} onChange={(e) => setSelected_city(e.target.value)}>
                                    <option>
                                        Select city
                                    </option>
                                    {
                                        city.districts.map(city => (
                                            <option>
                                                {city}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 pe-4 ps-4 p-2">
                        <div className=''></div>

                        <div className="col-md-3 col-sm-12">
                            <h4>Address in UAE</h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("add2", { required: "Address is required" })}
                                    placeholder="Enter your address in UAE"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                        color: "white"
                                    }}
                                ></input>
                            </div>
                            {errors.add2 && (<label className='label'>{errors.add2.message}</label>)}

                        </div>


                        <div className="col-md-3 col-sm-12 mt-4">
                            <h4></h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <select style={{
                                    height: "100%",
                                    width: "100%",
                                    border: "none",
                                    background: "none",
                                }}
                                    onChange={(e) => updateState(e)}>
                                    <option >Select state </option>
                                    {

                                        states.map(state => (
                                            <option >{state.state}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 mt-4">
                            <h4></h4>
                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <select
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }} onChange={(e) => setSelected_city(e.target.value)}>
                                    <option>
                                        Select city
                                    </option>
                                    {
                                        city.districts.map(city => (
                                            <option>
                                                {city}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>



                    <div className="row mt-1 pe-4 ps-4 p-2">


                        <div className=" col-sm-12 col-md-3 mt-4">

                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("study", { required: "Enter Year of study in BMNC" })}
                                    placeholder="Year of study in FMNC "
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                        color: "white"
                                    }}
                                ></input>
                            </div>
                            {errors.study&& (<label className='label'>Enter  the Year of study in FMNC</label>)}

                        </div>
                        <div className=" col-sm-12 col-md-3 mt-4">

                            <div
                                style={{
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("degree", { required: "Date of birth required" })}
                                    type="text"
                                    placeholder="Degree"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            {errors.degree && (<label className='label'>* Enter your Degree</label>)}

                        </div>

                        <div className=" col-sm-12 col-md-3 mt-4">
                            <div
                                style={{

                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    borderRadius: "10px",
                                }}
                            >
                                <input
                                    {...register("yop", { required: "Date of birth required" })}
                                    type="text"
                                    placeholder="Year of passing"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                    }}
                                ></input>
                            </div>
                            {errors.yop && (<label className='label'>* Enter your year off passout</label>)}

                        </div>

                    </div>



                    <div className="row mt-4 pe-4 ps-4 p-2 smallMarried" >
                    <div className=' col-md-2 col-sm-12'><h4>Marital status</h4></div>  
                    

                        <div className="col-md-2 col-sm-12 mt-4 col-xs-6 small">

                            <div
                                style={name == "Married" ? {
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px",
                                } : {
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    
                                    borderRadius: "10px",
                                }}
                            >

                                <div class="form-check"  {...register("marriedornot", { required: "Date of birth required" })}>
                                    <input                                    

                                    class="form-check-input" type="radio" name='marital' onMouseUp={() => marital_status("Married")} value={name} id="flexCheckIndeterminate" />
                                    <label class="form-check-label" for="flexCheckIndeterminate">
                                        married
                                    </label>

                                </div>

                            </div>
                        </div>
                        <div className="col-md-2 mt-4 col-sm-12 col-xs-6 small">
                            <div

                                style={name == "UnMarried" ? {
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    
                                    borderRadius: "10px",
                                } : {
                                    backgroundColor: "rgb(237, 163, 5)",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    borderRadius: "10px",
                                }}
                            >

                                <div class="form-check ">
                                    <input 
                                    class="form-check-input" type="radio" name='marital' onMouseUp={() => marital_status("UnMarried")} value={name} id="flexCheckIndeterminate" />
                                    <label class="form-check-label " for="flexCheckIndeterminate">
                                        unmarried
                                    </label>
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 col-sm-12 mt-4 smallmgt">
                            <div>
                                {name == "Married" ? <div
                                    style={{
                                        backgroundColor: "rgb(237, 163, 5)",
                                        height: "50px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "5px",
                                        borderRadius: "10px",
                                    }}
                                >

                                    <input
                                        {...register("spname", { required: "spouse name is required" })}
                                        type='text'
                                        placeholder="spouse name"
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            border: "none",
                                            background: "none",
                                            color: "white"
                                        }}
                                    ></input>



                                    

                                </div> : ""}
                                {errors.spname && (<label className='label' >Spouse name is a required field</label>)}

                            </div>

                        </div>
                        {errors.marriedornot && (<label className='label' style={{textAlign:"center"}}>Marital status is a required field</label>)}

                    </div>

                    {name == "Married" ?

                    <div className='row mt-2 pe-4 ps-4 p-2'>

                        <button className="btn  m-5 col-sm-12"
                            style={{
                                height: '50px',
                                width: '200px',
                                backgroundColor: "rgb(237, 163, 5)",
                                alignContent: "center"

                            }} onClick={() => addChildfn()}>Add Children</button>

                        {
                            children.map((data, key) => (
                                <div className='row mt-3 pe-4 ps-4 p-2'>

                                    <div className='col-sm-12 col-md-2'><h4>Child name {key + 1} :</h4></div>
                                    <div className='col-sm-12 col-md-3 smallmgt'><div
                                        style={{
                                            backgroundColor: "rgb(237, 163, 5)",
                                            height: "50px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "5px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                    
                                        <input
                                            {...register("child", { required: "child name is required" })}
                                            onChange={(e)=>(updatechild(e.target.value,key))}
                                            type='text'
                                            // value={data.name}
                                            placeholder="Child name"
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                border: "none",
                                                background: "none",
                                                color: "white"
                                            }}
                                        ></input>
                                    
                                        
                                    </div>
                                        {errors.child && (<label className='label'>* Enter your child name</label>)}
                                    </div>
                                    <div className='col-sm-12 col-md-3 mt-3  smallmgt'><div
                                        style={{
                                            backgroundColor: "rgb(237, 163, 5)",
                                            height: "50px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "5px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <input
                                            {...register("childob", { required: "child dob is required" })}

                                            type='date'
                                            placeholder="dd/mm/yy"
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                border: "none",
                                                background: "none",
                                                color: "white"
                                            }}
                                        ></input>
                                    </div>{errors.childob && (<label className='label'>* Enter your child's DOB</label>)}
                                    </div>
                                    <div className="col-md-1 col-sm-12 mb-2 mt-3">
                                        <button className="btn btn-warning" onClick={() => removechild(key)}><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" class="bi bi-trash" viewBox="0 0 18 18">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg></button>
                                    </div>

                                </div>))
                        }

                    </div>
                     : ""}

                    <div className='body p-5'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" required />
                            <label class="form-check-label" for="flexCheckIndeterminate">
                                I AGREE THE TERMS AND CONDITIONS AND PEOPLE WHO USE THIS SERVICE MAY BE REQUESRED TO SUBMIT YOUR PERSONAL INFORMATION ,IN ORDER TO USE THIS SERVICE
                            </label>
                        </div></div>

                    <div className='row mt-5 mb-5 w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className=' body'>
                            <button
                                style={{
                                    height: '50px',
                                    width: '200px',
                                    backgroundColor: "rgb(237, 163, 5)",
                                    alignContent: "center"

                                }} >Submit</button></div>
                        <div className='col-2'></div>
                        <div className='col-2'></div>
                    </div>


                </form>

                <div className='row mt-5'>

                    <div className='col-2' style={{ color: "black" }}><h5>Language:</h5></div>
                    <div className='col-2' style={{ color: "white" }}><h5>English(US)</h5></div>
                    <div className='col-2' style={{ color: "white" }}><h5>Arabic</h5></div>
                    <div className='col-2' style={{ color: "white" }}><h5>Hindi</h5></div>
                    <div className='col-2' style={{ color: "white" }}><h5>Malayalam</h5></div>
                    <div className='col-2' style={{ color: "white" }}><h5>Tamil</h5></div>


                </div>
            </div>
        </div>


    );
}

export default App;