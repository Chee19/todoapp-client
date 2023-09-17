import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";

const NotePage = () => {

    const {id} = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getNote();
    }, [id]);

    const getNote = async () => {
        const response = await fetch(`/api/notes/${id}/`);
        const data = await response.json();
        setNote(data);
    }

    const createNote = async () => {
        await fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    };
    const updateNote = async () => {
        await fetch(`/api/notes/${id}/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    };

    const deleteNote = async () => {
        fetch(`/api/notes/${id}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const handleSubmit = () => {
        if (id !== "new" && note.body === "") {
            deleteNote();
        } else if (id !== "new") {
            updateNote();
        } else if (id === "new" && note.body !== null) {
            createNote();
        }
        navigate("/");
    }
    return(
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={() => {handleSubmit()}}/>
                </h3>
                {id === 'new' ? (
                    <button onClick={handleSubmit}>Done</button>
                ) : (
                    <button onClick={deleteNote}>Delete</button>
                )}
            </div>
            <textarea onChange={(e) => {setNote({...note, "body": e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage;