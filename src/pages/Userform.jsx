	
	import React, { Fragment, useEffect, useState } from 'react';
    import { Link, Navigate, useNavigate } from 'react-router-dom'
    import { Listbox, Transition } from '@headlessui/react'
    import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
    import axios from 'axios'
    
    
    
    const Userform = () => {
    
        const [error, setError] = useState("");
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [occupation, setOccupation] = useState("");
        const [state, setState] = useState("");
        const [data, setData] = useState({});
  
        

    // axios to call put data into setData
        const url = 'https://frontend-take-home.fetchrewards.com/form';
        useEffect(() => {
          axios.get(url).then((response) =>{
            setData(response.data)
                 
          })
        },[url])  

        //our submit using fetch, take our input check if there is input POST it to url
        const handleSubmit =  (e) => {
          e.preventDefault()
            const userdata = {name: name, email: email, password: password, occupation: occupation, state: state}  
             if (name.length < 1 || email.length < 1 || password.length < 1 || occupation.length < 1 || state.length < 1) 
             {
              return alert("Required Field");
             }     
            try {fetch('https://frontend-take-home.fetchrewards.com/form', {
              method: 'POST',
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(userdata)
            }).then(response => response.json());
            console.log(userdata)
            alert("Information has been submitted. Thank You!")
          }
          catch (e) {
            setError(e.message)
          console.log(e.message)
          }
          }
          function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
          }   
      return (
        <div>
            
            <div className=' max-w-[400px] mx-auto min-h-[600] px-4 py-20'>
          <h1 className='text-2xl font-bold'>Sign Up</h1>
          {error ? <p className='bg-red-300 p-3 my-2'>Please fill in all inputs!</p> : null}
          <form onSubmit={handleSubmit}>
            <div className='my-4'>
            <label>Full Name</label>
              <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                <input 
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl' 
                type="name"
                required
                /> 
                
              </div>
    
              <label>Email</label>
              <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl' 
                type="email"
                required
                  /> 
              </div>
            </div>
    
            <div className='my-4'>
              <label>Password</label>
              <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'  
                type="password"
                required
                />  
              </div>
            </div>
    
    {/* DROPDOWN JOBs  when open variables change*/}
    
            <div className="my-4">
            <Listbox   value={data.occupations} onChange={setOccupation}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Occupation</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-black bg-white py-4 pl-3 pr-10 text-left shadow-sm focus:border-[#5e0255] focus:outline-none focus:ring-1 focus:ring-[#5e0255] sm:text-sm">
                  <span className="flex items-center">               
                    <span className="ml-3 block truncate">{occupation}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {/* map through jobs to display  */}
                  <Listbox.Options className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.occupations?.map((occupation, j) => (
                      <Listbox.Option
                      onChange={(e) => setOccupation(e.target.value)}
                        key={j}                      
                        className={({ active }) =>
                          classNames(
                            active ? 'text-gray-500' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                          )
                        }
                        value={occupation}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              
                              <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {occupation}
                              </span>
                            </div>       
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
    </div>

    

{/* State DROP DOWN when open variables change*/}
<div className="my-4">
            <Listbox   value={data.states} onChange={setState}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">State</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-black bg-white py-4 pl-3 pr-10 text-left shadow-sm focus:border-[#5e0255] focus:outline-none focus:ring-1 focus:ring-[#5e0255] sm:text-sm">
                  <span className="flex items-center">               
                    <span className="ml-3 block truncate">{state}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {/* map through states to display the name no abbreviation */}
                  <Listbox.Options className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.states?.map((state, s) => (
                      <Listbox.Option
                      onChange={(e) => setState(e.target.value)}
                        key={s}                      
                        className={({ active }) =>
                          classNames(
                            active ? 'text-gray-500' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                          )
                        }
                        value={state.name}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              
                              <span
                                className={classNames(selected ? 'font-semibold ' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {state.name}
                              </span>
                            </div>       
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
    </div>
         
                
            <button className='w-full me-2 p-3 text-white rounded-2xl shadow-xl bg-[#1f001e] hover:bg-[#5e0255] '>Sign Up</button>
          </form>
          
        </div>  
      </div>
      )
    }
    
    export default Userform