import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from "../../assets/logo.svg";

import api from '../../services/api';

export default function NewIncident() {

    const ong_id = localStorage.getItem("ongId");
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    async function registerNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        await api.post("/incidents", data, { 
            headers: { Authorization: ong_id }
        }).then(response => {
            alert("Caso cadastrado com sucesso!");
            history.push("/profile");
        }).catch(err => {
            alert("Erro ao cadastrar caso.");
        })
    }

    return (
        <div className="incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    
                    <h1>Cadastra novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói
                        para resolver isso.
                    </p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft height="16" color="#e02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button 
                        className="button"
                        type="submit"
                        onClick={registerNewIncident}
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}