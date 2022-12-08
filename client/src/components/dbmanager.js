import React from "react";
import '../styles/Abm.css';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo, postLogin, registerOperation } from '../actions';
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";
import axios from "axios";


Modal.setAppElement('#root');


export default function Dbamanager() {
    const dispatch = useDispatch();
    const login = useSelector((state)=>state.login);
    const history=useHistory()
    const [input, setInput]= useState({
        usuario: "",
        contrasena: ""
    })
    const handleInput = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let json = await axios.post("https://ps-ch-deploy.herokuapp.com/login", input);
        dispatch(postLogin(input)).then(() => {
            if (json.data?.user && json.data?.pass){
                history.push("/abm")
            }

        })
    }
    return (
        <div className="div-main-abm">
            <Navbar />
            <h2>ABM DE SERIES</h2>
            <div className="div-balance-title div-abm-title">Modulo de ingreso</div>
            <form onSubmit={(e)=>handleSubmit(e)} className="div-main-form">
                <label>Usuario</label>
                <input name="usuario" value={input.user} onChange={(e)=>handleInput(e)} placeholder="Ingrese el usuario" type='text' ></input>
                <label>Contraseña</label>
                <input name="contrasena" value={input.pass} onChange={(e)=>handleInput(e)} placeholder="Ingrese la contraseña" type='text' ></input>
                

                <button type="submit" className="button-form">Ingresar</button>
            </form>

        </div>
    )
}