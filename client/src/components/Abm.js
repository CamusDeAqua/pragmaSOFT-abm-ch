import React from "react";
import '../styles/Abm.css';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo, registerOperation } from '../actions';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';



Modal.setAppElement('#root');


export default function Abm() {

    const login = useSelector((state)=>state.login);
    const history=useHistory()
    const dispatch = useDispatch();
    const series = useSelector(state => state.series);

    useEffect(() => {
        dispatch(getInfo());
        console.log(series?.series)
    }, [dispatch]);

    const [input, setInput] = useState({
        titulo: "",
        descripcion: "",
        fechadeEstreno: "",
        estrellas: "",
        genero: "",
        precioAlquiler: "",
        atp: false,
        estado: "",
    });


    const [currentInfo, setCurrentInfo] = useState({
        titulo: "",
        descripcion: "",
        fechadeEstreno: "",
        estrellas: "",
        genero: "",
        precioAlquiler: "",
        atp: "",
        estado: "",
    });


    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleInputModal(e) {
        setCurrentInfo({
            ...currentInfo,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (currentInfo.id) {
            if (!currentInfo.titulo) {
                return alert('Ingresa el titulo');
            } else if (!currentInfo.descripcion) {
                return alert('Ingresa la descripcion');
            } else if (!currentInfo.fechadeEstreno) {
                return alert('Ingresa la fecha de estreno');
            }
            dispatch(registerOperation(currentInfo));
            alert('Operation registred successfully!');
            dispatch(getInfo());
            setCurrentInfo({
                titulo: "",
                descripcion: "",
                fechadeEstreno: "",
                estrellas: "",
                genero: "",
                precioAlquiler: "",
                atp: "",
                estado: "",
                type: ""
            })
            closeModal();
        } else {
            if (!input.titulo) {
                return alert('Enter a concept');
            } else if (!input.descripcion) {
                return alert('Enter amount');
            } else if (!input.fechadeEstreno) {
                return alert('Select a date');
            }
            dispatch(registerOperation(input));
            alert('Operation registred successfully!');
            dispatch(getInfo());
            setInput({
                titulo: "",
                descripcion: "",
                fechadeEstreno: "",
                estrellas: "",
                genero: "",
                precioAlquiler: "",
                atp: false,
                estado: "",
            })
        }
    }

    function handleDelete(e) {
        if (window.confirm('Do you want delete this row?')) {
            dispatch(registerOperation({
                ...currentInfo,
                id: e.id,
                type: e.type,
                destroy: true
            }));
            alert('Operation registered successfully!');
            setCurrentInfo({
                concept: "",
                amount: "",
                date: "",
                id: "",
                type: ""
            })
            dispatch(getInfo());
        }
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(e) {
        setCurrentInfo({
            titulo: e.titulo,
            descripcion: e.descripcion,
            fechadeEstreno: e.fechadeEstreno,
            estrellas: e.estrellas,
            genero: e.genero,
            precioAlquiler: e.precioAlquiler,
            atp: e.atp,
            estado: e.estado,
            id: e.id
        })
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }



    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            textAlign: 'center',
            backgroundColor: 'transparent'
        },
    };
    const [isChecked, setIsChecked] = useState(false);
    function handleCheck(e) {

        let checkstate
        if (isChecked) {
            setIsChecked(false)
            checkstate = false
        } else {
            setIsChecked(true)
            checkstate = true
        }
        setInput({
            ...input,
            [e.target.name]: checkstate
        })
    }
    const [isCheckedModal, setIsCheckedModal] = useState(false);
    function handleCheckModal(e) {

        let checkstate
        if (isCheckedModal) {
            setIsCheckedModal(false)
            checkstate = false
        } else {
            setIsCheckedModal(true)
            checkstate = true
        }
        setCurrentInfo({
            ...currentInfo,
            [e.target.name]: checkstate
        })
    }

    let [ checkLogin, setCheckLogin ] = useState(false);

    function loginVerify (){
        setCheckLogin(true);
        if(!login.user || !login.pass){
            history.push('/login');
        }
    }

    !checkLogin && loginVerify();

    return (
        <div className="div-main-abm">
            <Navbar />
            <h2>ABM DE SERIES</h2>
            <div className="div-balance-title div-abm-title">Registro de Operaciones</div>
            <form onSubmit={(e) => handleSubmit(e)} className="div-main-form">
                <label>TITULO</label>
                <input name="titulo" value={input.titulo} placeholder="Ingrese el titulo" type='text' onChange={(e) => handleInput(e)}></input>
                <label>DESCRIPCION</label>
                <input name="descripcion" value={input.descripcion} placeholder="Ingrese la descripcion" type='text' onChange={(e) => handleInput(e)}></input>
                <label>FECHA DE ESTRENO</label>
                <input name="fechadeEstreno" type='date' value={input.fechadeEstreno} onChange={(e) => handleInput(e)}></input>
                <label>ESTRELLAS</label>
                <input name="estrellas" value={input.estrellas} placeholder="Ingrese estrellas" type='number' onChange={(e) => handleInput(e)}></input>
                <label>GENERO</label>
                <input name="genero" value={input.genero} placeholder="Ingrese el genero" type='text' step='0.01' onChange={(e) => handleInput(e)}></input>
                <label>PRECIO DE ALQUILER</label>
                <input name="precioAlquiler" type='number' value={input.precioAlquiler} onChange={(e) => handleInput(e)}></input>
                <label>ATP</label>
                <input name="atp" checked={isChecked} value={isChecked ? true : false} type='checkbox' onChange={(e) => handleCheck(e)}></input>
                <label>ESTADO</label>
                <input name="estado" type='text' value={input.estado} onChange={(e) => handleInput(e)}></input>


                <button type="submit" className="button-form">Confirmar</button>
            </form>

            <h2>series</h2>

            <div className='div-main-balance div-balance-title-right div-balance-title-left div-balance-margintop'>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>Titulo</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>Descripcion</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>Fecha de estreno</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>estrellas</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>Genero</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>Precio de alquiler</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>ATP</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'>Estado</div>
                <div className='div-balance-title-right div-balance-title-left div-balance-title'></div>

            </div>
            <div className='div-main-balance div-main-balance-border'>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.titulo}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.descripcion}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.fechadeEstreno.slice(0,4) + "/" + i.fechadeEstreno.slice(5,7) + "/" + i.fechadeEstreno.slice(8,10)}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.estrellas}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.genero}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.precioAlquiler}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.atp ? "si" : "no"}</li>)
                            })
                        }
                    </ul>
                </div>


                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                return (<li key={i.id}>{i.estado}</li>)
                            })
                        }
                    </ul>
                </div>

                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            series?.length && series.map(i => {
                                let arr = i;
                                arr.type = 'series';
                                return (
                                    <div key={i.id}>
                                        <button onClick={() => openModal(arr)}>Editar</button>
                                        <button onClick={() => handleDelete(arr)}>Borrar</button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className='Modal'>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="div-balance-title div-abm-title">Modificacion de Operacion</div>
                    <form onSubmit={(e) => handleSubmit(e)} className="div-main-form">

                    <label>titulo</label>
                <input name="titulo" defaultValue={currentInfo.titulo} placeholder="Ingrese el titulo" type='text' onChange={(e) => handleInputModal(e)}></input>
                <label>DESCRIPCION</label>
                <input name="descripcion" defaultValue={currentInfo.descripcion} placeholder="Ingrese la descripcion" type='text' onChange={(e) => handleInputModal(e)}></input>
                <label>FECHA DE ESTRENO</label>
                <input name="fechadeEstreno" type='date' defaultValue={currentInfo.fechadeEstreno} onChange={(e) => handleInputModal(e)}></input>
                <label>ESTRELLAS</label>
                <input name="estrellas" defaultValue={currentInfo.estrellas} placeholder="Ingrese los actores" type='number' onChange={(e) => handleInputModal(e)}></input>
                <label>GENERO</label>
                <input name="genero" defaultValue={currentInfo.genero} placeholder="Ingrese el genero" type='text' step='0.01' onChange={(e) => handleInputModal(e)}></input>
                <label>PRECIO DE ALQUILER</label>
                <input name="precioAlquiler" type='number' defaultValue={currentInfo.precioAlquiler} onChange={(e) => handleInputModal(e)}></input>
                <label>ATP</label>
                <input name="atp" checked={isCheckedModal} defaultValue={isCheckedModal ? true : false} type='checkbox' onChange={(e) => handleCheckModal(e)}></input>
                <label>ESTADO</label>
                <input name="estado" type='text' defaultValue={currentInfo.estado} onChange={(e) => handleInputModal(e)}></input>
                        <button type="submit" className="button-form">Confirmar</button>
                        <button onClick={closeModal} className='button-form'>Cancelar</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}