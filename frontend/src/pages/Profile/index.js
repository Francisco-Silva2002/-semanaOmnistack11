import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./styles.css";
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from "../../services/api";

export default function Profile() {

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ong_name = localStorage.getItem("ongName");
    const ong_id = localStorage.getItem("ongId");

    async function listIncidents() {
        const response = await api.get("/profile", { 
            headers: { Authorization: ong_id } 
        }).then(response => {
            setIncidents(response.data);
        }).catch(err => {
            alert("Erro na listagem de casos");
        })
    }

    async function handleDeleteIncident(id) {
        await api.delete(`/incidents/${id}`, { 
            headers: { Authorization: ong_id } 
        }).then(response => {
            alert("Caso deletado com sucesso!")
            setIncidents(incidents.filter(inc => inc.id !== id))
            //setRefresh(!refresh);
        }).catch(err => {
            alert("Erro ao deletar caso.")
        })
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    useEffect(() => {
        listIncidents();
    }, [ong_id]);

    return (
        <div className="profile-container" onLoad={listIncidents}>
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, { ong_name }</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button 
                    type="button"
                    onClick={handleLogout}
                >
                    <FiPower size="18" color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                { incidents &&
                    incidents.map(inc => (
                        <li key={inc.id}>
                            <strong>CASO:</strong>
                            <p>{inc.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{inc.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat("pt-BR", { 
                                style: "currency", currency: "BRL"
                             }).format(inc.value)}</p>
                            
                            <button 
                                type="button"
                                onClick={() => handleDeleteIncident(inc.id)}
                            >
                                <FiTrash2 size="20" color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}